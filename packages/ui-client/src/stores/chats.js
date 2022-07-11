import { defineStore } from 'pinia';
import { useRepository } from '../services/useRepository';
import { toRefs } from 'vue';

const chatsMock = Array(50).fill(0).map((_, i) => ({
  id: i + 1,
  user: {
    id: 1,
    email: 'test@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    username: 'test',
    password: 'password',
    blockedAt: null,
    createdAt: '2022-07-10T17:46:25.669Z',
    updatedAt: '2022-07-10T17:46:25.669Z',
  },
  lastMessageSentAt: '2022-07-10T17:46:25.669Z',
}));

export const useChatsStore = defineStore('chats', () => {
  const repo = useRepository({
    async fetchData ({ page }) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const limit = 20;
      return {
        total: chatsMock.length,
        data: chatsMock.slice((page - 1) * limit, page * limit),
      };
    },
  });

  const {
    state,
    fetchData: fetchChats,
    loadMore: loadMoreChats,
  } = repo;

  const {
    data: chats,
    isLoading,
    total,
    isEnd,
  } = toRefs(state);

  return {
    chats,
    isLoading,
    total,
    isEnd,
    fetchChats,
    loadMoreChats,
  };
});
