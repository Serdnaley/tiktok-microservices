import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      meta: { auth: false },
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      path: "/",
      name: "Home",
      meta: { auth: true },
      component: () => import("@/pages/HomePage.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.auth === null) return true
  if (to.meta.auth) {
    const authStore = useAuthStore()

    if (!authStore.me && authStore.accessToken) {
      await authStore.fetchProfile()
    }

    if (!authStore.profile) {
      return { name: "Login" }
    }

    return true
  } else {
    const authStore = useAuthStore()

    if (authStore.profile) {
      return { name: "Home" }
    }

    return true
  }
})

export default router;
