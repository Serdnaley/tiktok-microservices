<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  isMuted: Boolean,
  isPlaying: Boolean,
});

const videoEl = ref(null);
watch(() => props.isPlaying, () => {
  if (videoEl.value) {
    props.isPlaying
      ? videoEl.value.play()
      : videoEl.value.pause();
  }
});
</script>

<template>
  <div class="VideoCard">
    <video
      :src="video.file.url"
      :muted="isMuted"
      ref="videoEl"
    />
  </div>
</template>

<style lang="scss">
.VideoCard {
  height: 100%;
  width: 100%;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
