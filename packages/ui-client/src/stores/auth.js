import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { request } from '@/services/request';
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
    accessToken.value = res.data.data.accessToken;
  };

  const fetchProfile = async () => {
    isLoading.value = true;

    const res = await request.get('/auth/profile').catch(errorHandler);

    isLoading.value = false;
    profile.value = res.data.data;
  };

  const logout = async () => {
    accessToken.value = null;
    profile.value = null;
    await router.push({ name: 'Login' });
  };

  return {
    accessToken,
    profile,
    isLoading,
    login,
    logout,
    fetchProfile,
  };
});
