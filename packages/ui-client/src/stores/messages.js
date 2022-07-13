import { defineStore } from 'pinia';
import { useRepository } from '@/services/useRepository';
import { computed, ref, toRefs } from 'vue';
import { DateTime } from 'luxon';
import { request } from '@/services/request';
import { sortByDate } from '@/utils/date';

export const useMessagesStore = defineStore('messages', () => {
  const chatId = ref(null);
  const repo = useRepository({
    async fetchData ({ page }) {
      const {
        data: { data, total },
      } = await request.get(`/chats/${chatId.value}/messages`, { page });

      return {
        data,
        total,
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

  const messagesByDays = computed(() => {
    const messagesByDays = {};

    messages.value.forEach(message => {
      const date = DateTime.fromISO(message.createdAt).toFormat('yyyy-MM-dd');
      if (!messagesByDays[date]) {
        messagesByDays[date] = [];
      }
      messagesByDays[date].push(message);
    });

    const groups = Object.keys(messagesByDays).map((date) => {
      return {
        date,
        messages: sortByDate(messagesByDays[date], 'createdAt'),
      };
    });

    return sortByDate(groups, 'date');
  })

  const errorHandler = (error) => {
    console.error(error);
    alert('Something went wrong');
    throw error;
  };

  const sendMessage = async (text) => {
    const { data: { data } } = await request
      .post(`/chats/${chatId.value}/messages`, { text })
      .catch(errorHandler);

    messages.value.push(data);
  };

  return {
    chatId,
    messages,
    messagesByDays,
    isLoading,
    total,
    isEnd,
    fetchMessages,
    loadMoreMessages,
    resetMessages,
    sendMessage,
  };
});
