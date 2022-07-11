<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.profile" class="Menu">
    <div class="Menu__item">
      <router-link :to="{ name: 'Videos' }">
        Videos
      </router-link>
    </div>

    <div class="Menu__item">
      <router-link :to="{ name: 'Chats' }">
        Chats
      </router-link>
    </div>

    <div class="Menu__item">
      <router-link :to="{ name: 'Profile' }">
        Profile
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.Menu {
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 99;
  transform: translateX(-50%);
  border: 1px solid var(--border-color);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  max-width: 400px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: var(--main-bg);

  .router-link-exact-active {
    color: var(--primary-color);
  }
}
</style>
