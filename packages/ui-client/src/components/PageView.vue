<script setup>
import { ref } from "vue";
import AppLoading from "@/components/AppLoading.vue";
import Menu from './Menu.vue';

const isLoading = ref(false);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="PageView__transition-default-" mode="out-in">
      <AppLoading v-if="isLoading" />

      <template v-else>
        <div class="PageView__content">
          <component :is="Component" :key="$route.path" />
        </div>
      </template>
    </transition>
  </router-view>

  <Menu />
</template>

<style lang="scss">
.PageView {
  &__transition {
    &-default {
      &--enter-active {
        transition: all 0.3s ease;
        transform: scale(0.95);
        transform-origin: 50% 0;
        opacity: 0;
      }

      &--enter-to {
        transform: scale(1);
        opacity: 1 !important;
      }

      &--leave-active {
        transition: all 0.3s ease;
        transform: scale(1);
        transform-origin: 50% 0;
      }

      &--leave-to {
        transform: scale(0.95);
        opacity: 0 !important;
      }
    }
  }
}
</style>
