<script setup></script>

<template>
  <div class="AppLoading">
    <span class="AppLoading__text">Loading...</span>
  </div>
</template>

<style lang="scss">
.AppLoading {
  position: fixed;
  z-index: 99999;
  background: var(--main-bg);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__text {
    color: var(--text-color-dark);
    animation: AppLoading__text 2s ease-in-out infinite;

    @keyframes AppLoading__text {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
  }
}
</style>
