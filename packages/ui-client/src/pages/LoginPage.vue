<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import InputText from "../components/InputText.vue";
import Button from '../components/Button.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
const formData = reactive({
  email: "",
  password: "",
});

const router = useRouter()
const submit = async () => {
  await authStore.login(formData)
  await router.push({ name: 'Home' })
}
</script>

<template>
  <div class="LoginPage">
    <div class="LoginPage__logo">
      <span>TikTok</span>
      <span>TikTok</span>
      <span>TikTok</span>
    </div>

    <form class="LoginPage__form" @submit.prevent="submit()">
      <InputText
        v-model="formData.email"
        :disabled="authStore.isLoading"
        label="Email"
        type="email"
        class="LoginPage__form-item"
      />
      <InputText
        v-model="formData.password"
        :disabled="authStore.isLoading"
        label="Password"
        type="password"
        class="LoginPage__form-item"
      />

      <Button
        style-variant="primary"
        :disabled="authStore.isLoading"
      >
        {{ authStore.isLoading ? 'Loading...' : 'Login' }}
      </Button>
    </form>
  </div>
</template>

<style lang="scss">
.LoginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__form {
    width: 300px;

    &-item {
      margin-bottom: 15px;
    }
  }

  &__logo {
    position: relative;
    width: 100%;
    height: 64px;
    font-size: 64px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 60px;

    span {
      position: absolute;
      width: 100%;
      text-align: center;

      &:nth-child(1) {
        color: var(--primary-color);
        transform: translate(-3px, -2px);
      }
      &:nth-child(2) {
        color: var(--primary-color-2);
        transform: translate(3px, 2px);
      }
      &:nth-child(3) {
        color: var(--text-color);
      }
    }
  }
}
</style>
