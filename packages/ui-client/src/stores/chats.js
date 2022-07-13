import { defineStore } from 'pinia';
import { useRepository } from '@/services/useRepository';
import { computed, ref, toRefs } from 'vue';
import { request } from '@/services/request';
import { sortByDate } from '@/utils/date';

export const useChatsStore = defineStore('chats', () => {
  const repo = useRepository({
    async fetchData ({ page }) {
      const {
        data: { data, total },
      } = await request.get('/chats', { page });

      return {
        data,
        total,
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

  const chatsSorted = computed(() => sortByDate(chats.value, ['lastMessage', 'createdAt'], 'DESC'));

  const errorHandler = (error) => {
    console.error(error);
    alert('Something went wrong');
    throw error;
  };

  const chat = ref(null);
  const isChatLoading = ref(false);
  const fetchChat = async (id) => {
    isChatLoading.value = true;

    const { data: { data } } = await request.get(`/chats/${id}`).catch(errorHandler);

    chat.value = data;
    isChatLoading.value = false;
  };

  const createChat = async (username) => {
    isChatLoading.value = true;

    username = username.replaceAll(/[^a-z\d_.]/ig, '');
    const { data: { data } } = await request
      .post('/chats', { username })
      .catch(errorHandler);

    isChatLoading.value = false;

    return data;
  };

  return {
    chats,
    chatsSorted,
    isLoading,
    total,
    isEnd,
    chat,
    isChatLoading,
    fetchChat,
    fetchChats,
    loadMoreChats,
    createChat,
  };
});
