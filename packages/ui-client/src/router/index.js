import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/profile',
    },
    {
      path: '/login',
      name: 'Login',
      meta: { auth: false },
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { auth: true },
      component: () => import('@/pages/ProfilePage.vue'),
    },
    {
      path: '/videos',
      name: 'Videos',
      meta: { auth: true },
      component: () => import('@/pages/VideosPage.vue'),
    },
    {
      path: '/chats',
      name: 'Chats',
      meta: { auth: true },
      component: () => import('@/pages/ChatsPage.vue'),
    },
    {
      path: '/chats/:chatId',
      name: 'Chat',
      meta: { auth: true },
      component: () => import('@/pages/ChatPage.vue'),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.auth === null) return true;

  const authStore = useAuthStore();

  if (to.meta.auth) {
    if (!authStore.me && authStore.accessToken) {
      await authStore.fetchProfile();
    }

    if (!authStore.profile) {
      return { name: 'Login' };
    }

    return true;
  } else {
    if (authStore.profile) {
      return { name: 'Home' };
    }

    return true;
  }
});

export default router;
