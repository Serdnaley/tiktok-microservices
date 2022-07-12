<script setup>
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import { useChatsStore } from '../stores/chats';
import ChatHeader from '@/components/chat/ChatHeader.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const chatId = computed(() => +route.params.chatId);

const {
  chat,
  isChatLoading,
} = storeToRefs(useChatsStore());
const {
  fetchChat,
} = useChatsStore()

watch(chatId, () => fetchChat(chatId.value), { immediate: true });
</script>

<template>
  <div class="ChatPage">
    <div v-if="isChatLoading" class="ChatPage__loading">
      Loading...
    </div>
    <template v-else-if="chat">
      <ChatHeader class="ChatPage__header" :chat="chat"/>
      <ChatMessages class="ChatPage__messages" :chat="chat"/>
      <ChatInput class="ChatPage__input" :chat="chat"/>
    </template>
  </div>
</template>

<style lang="scss">
.ChatPage {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__header {
    height: 60px;
  }

  &__messages {
    max-height: calc(100% - 60px - 70px);
    margin-top: auto;
    flex-shrink: 1;
  }

  &__input {
    height: 70px;
  }
}
</style>
