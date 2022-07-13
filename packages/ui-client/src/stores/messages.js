import { defineStore } from 'pinia';
import { useRepository } from '../services/useRepository';
import { computed, ref, toRefs } from 'vue';
import { DateTime } from 'luxon';
import { randomBySeed } from '../utils/math';

const messagesMock = Array(5000).fill(0).map((_, i) => ({
  id: i + 1,
  text: 'Text #' + (i + 1),
  chatId: Math.round(1 + 50 * randomBySeed(i + 1.5672)),
  userId: Math.round(1 + 1 * randomBySeed(i + 2.1234)),
  createdAt: DateTime.local().minus({ days: i }).toJSDate(),
}));

export const useMessagesStore = defineStore('messages', () => {
  const chatId = ref(null);
  const repo = useRepository({
    async fetchData ({ page }) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const limit = 20;
      const messagesInChat = messagesMock.filter(m => m.chatId === chatId.value);

      return {
        total: messagesInChat.length,
        data: messagesInChat.slice((page - 1) * limit, page * limit),
      };
    },
  });

  const {
    state,
    fetchData: fetchMessages,
    loadMore: loadMoreMessages,
    reset: resetMessages,
  } = repo;

  const {
    data: messages,
    isLoading,
    total,
    isEnd,
  } = toRefs(state);

  const messagesSorted = computed(() => {
    return messages.value.sort((a, b) => {
      return DateTime.fromISO(a.createdAt) - DateTime.fromISO(b.createdAt);
    });
  });

  const sendMessage = async (text) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    messages.value.push({
      id: messages.value.length + 1,
      text,
      chatId: chatId.value,
      userId: 1,
      createdAt: DateTime.local().toISO(),
    });
  };

  return {
    chatId,
    messages,
    messagesSorted,
    isLoading,
    total,
    isEnd,
    fetchMessages,
    loadMoreMessages,
    resetMessages,
    sendMessage,
  };
});
