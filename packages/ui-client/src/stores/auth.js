import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { request } from '../services/request';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken'));
  const profile = ref(null);

  watch(accessToken, (val) => localStorage.setItem('accessToken', val));

  const isLoading = ref(false);

  const errorHandler = (err) => {
    isLoading.value = false;
    console.error(err);
  };

  const login = async (payload) => {
    isLoading.value = true;

    const res = await request.post('/auth/login', payload).catch(errorHandler);

    isLoading.value = false;
    accessToken.value = res.data.accessToken;
  };

  const fetchProfile = async () => {
    isLoading.value = true;

    const res = await request.get(
      '/auth/profile',
      { accessToken: accessToken.value }
    ).catch(errorHandler);

    isLoading.value = false;
    profile.value = res.data;

    // @todo remove mock
    profile.value = {
      id: 1,
      email: 'test@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      username: 'test',
      password: 'password',
      blockedAt: null,
      createdAt: '2022-07-10T17:46:25.669Z',
      updatedAt: '2022-07-10T17:46:25.669Z',
    };
  };

  const logout = async () => {
    accessToken.value = null
    profile.value = null
    await router.push({ name: 'Login' })
  }

  return {
    accessToken,
    profile,
    isLoading,
    login,
    logout,
    fetchProfile,
  };
});
