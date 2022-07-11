import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';
import videosMock from '../services/videosMock.json';
import { useRepository } from '../services/useRepository';

const videosRepo = videosMock.map((url, i) => ({
  id: i + 1,
  title: 'Video 1',
  description: 'This is a video 1',
  file: {
    id: i + 1,
    url,
  },
}));

export const useVideosStore = defineStore('videos', () => {
  const repo = useRepository({
    async fetchData ({ page }) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const limit = 50;
      return {
        data: videosRepo.slice((page - 1) * limit, page * limit),
        total: videosRepo.length,
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
