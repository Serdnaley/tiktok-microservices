<script setup>
import { storeToRefs } from 'pinia';
import { useChatsStore } from '@/stores/chats';
import IconPlus from '../components/icons/IconPlus.vue';
import Button from '../components/Button.vue';

const {
  chatsSorted,
  isLoading,
  isEnd,
} = storeToRefs(useChatsStore());

const {
  fetchChats,
  loadMoreChats,
} = useChatsStore();

if (!chatsSorted.length) {
  fetchChats();
}
</script>

<template>
  <div class="ChatsPage">
    <div class="ChatsPage__header">
      <div class="ChatsPage__header-title">
        <h1>Chats</h1>
      </div>

      <router-link :to="{ name: 'ChatAdd' }">
        <IconPlus class="ChatsPage__header-add"/>
      </router-link>
    </div>

    <div class="ChatsPage__list">
      <router-link
        v-for="chat in chatsSorted"
        :key="chat.id"
        :to="{ name: 'Chat', params: { chatId: chat.id } }"
        class="ChatsPage__item"
      >
        <img :src="chat.companion.avatarUrl" alt="" class="ChatsPage__item-avatar">
        <div class="ChatsPage__item-info">
          <h3>@{{ chat.companion.username }}</h3>
          <p>{{ chat.lastMessage?.text }}</p>
        </div>
      </router-link>

      <Button
        v-if="!isLoading && !isEnd"
        class="ChatsPage__list-load-more"
        @click="loadMoreChats"
      >
        Load more
      </Button>

      <div v-if="isLoading" class="ChatsPage__list-loading">
        Loading...
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ChatsPage {
  padding-bottom: 50px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 24px;

    &-title {
    }

    &-add {
      padding: 7px;
      border-radius: 5px;
      background: var(--dark-bg);
      cursor: pointer;
    }
  }

  &__list {
    width: 100%;

    &-load-more {
      width: 100%;
      margin: 50px auto;
    }

    &-loading {
      width: 100%;
      text-align: center;
      margin: 50px 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 5px;
    border-bottom: 1px solid var(--border-color-2);
    cursor: pointer;

    &-avatar {
      height: 50px;
      width: 50px;
      object-fit: cover;
      border-radius: 50%;
    }

    &-info {
      h3, p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      p {
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>
