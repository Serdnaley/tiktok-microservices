<script setup>
import Button from '../Button.vue';

defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="ChatHeader">
    <Button class="ChatHeader__back" @click="$router.push({ name: 'Chats' })">
      &lt; Back
    </Button>
    <div class="ChatHeader__title">
      @{{ chat.companion.username }}
    </div>
  </div>
</template>

<style lang="scss">
.ChatHeader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid var(--border-color-2);

  &__back {
    background: none !important;
    color: var(--text-color) !important;
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
