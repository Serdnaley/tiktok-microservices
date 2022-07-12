<script setup>
import { useChatsStore } from '../stores/chats';
import InputText from '../components/InputText.vue';
import Button from '../components/Button.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const chatsStore = useChatsStore()

const username = ref('')
const submit = async () => {
  if (!username.value) return
  const chat = await chatsStore.createChat(username.value)

  if (chat) {
    await router.push({
      name: 'Chat',
      params: {
        chatId: chat.id,
      }
    })
  }
}
</script>

<template>
  <div class="ChatPage">
    <div class="ChatPage__header">
      <Button class="ChatPage__header-back" @click="$router.push({ name: 'Chats' })">
        &lt; Back
      </Button>
      <div class="ChatPage__header-title">
        New chat
      </div>
    </div>

    <div class="ChatPage__form">
      <InputText v-model="username" placeholder="Enter username..." />
      <Button @click="submit()">
        {{ chatsStore.isChatLoading ? 'Creating...' : 'Create' }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
.ChatPage {
  height: 100vh;

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid var(--border-color-2);
    height: 60px;

    &-back {
      background: none !important;
      color: var(--text-color) !important;
    }

    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__form {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}
</style>
