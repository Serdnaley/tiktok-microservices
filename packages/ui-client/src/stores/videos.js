import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';
import { useRepository } from '@/services/useRepository';
import { request } from '@/services/request';

export const useVideosStore = defineStore('videos', () => {
  const repo = useRepository({
    async fetchData ({ page }) {
      const {
        data: { data, total },
      } = await request.get('/videos', { page });

      return {
        data,
        total,
      };
    },
  });

  const {
    state,
    fetchData: fetchVideos,
    loadMore: loadMoreVideos,
  } = repo;

  const {
    data: videos,
    total,
    page,
    isLoading,
  } = toRefs(state);

  return {
    repo: ref(repo),
    videos,
    total,
    page,
    isLoading,
    fetchVideos,
    loadMoreVideos,
  };
});
