<script setup>
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useVideosStore } from '../stores/videos';
import Button from '../components/Button.vue';

const { profile } = storeToRefs(useAuthStore());
const { videos, total, isLoading } = storeToRefs(useVideosStore());
const { fetchVideos, loadMore } = useVideosStore();

fetchVideos();
</script>

<template>
  <div class="ProfilePage">
    <div class="ProfilePage__info">
      <img :src="profile.avatarUrl" alt="" class="ProfilePage__info-avatar">

      <div class="ProfilePage__info-name">
        <h1>@{{ profile.username }}</h1>
      </div>
    </div>

    <div class="ProfilePage__videos">
      <div
        v-for="video in videos"
        :key="video.id"
        class="ProfilePage__videos-item"
      >
        <video :src="video.file.url"></video>
      </div>

      <Button
        v-if="!isLoading && videos.length < total"
        class="ProfilePage__videos-load-more"
        @click="loadMore"
      >
        Load more
      </Button>

      <div v-if="isLoading" class="ProfilePage__videos-loading">
        Loading...
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ProfilePage {
  &__info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    margin-top: 50px;

    &-avatar {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 10px;
    }
  }

  &__videos {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-bottom: 150px;

    &-item {
      position: relative;
      width: calc((100% - 5px * 2) / 3);
      height: 20vh;

      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
        background: var(--dark-bg);
      }
    }

    &-load-more {
      width: 100%;
      margin: 50px 20px;
    }

    &-loading {
      width: 100%;
      text-align: center;
      margin: 50px 0;
    }
  }
}
</style>
