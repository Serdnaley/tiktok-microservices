<script setup>
import VideosSlider from '../components/VideosSlider.vue';
import { storeToRefs } from 'pinia';
import { useVideosStore } from '@/stores/videos';

const { repo } = storeToRefs(useVideosStore());
</script>

<template>
  <div class="VideosPage">
    <VideosSlider :repo="repo"/>
  </div>
</template>

<style lang="scss">
.VideosPage {
  height: 100vh;
}
</style>
