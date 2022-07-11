<script setup>
import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import IconSoundOn from './icons/IconSoundOn.vue';
import IconSoundOff from './icons/IconSoundOff.vue';
import VideoCard from './VideoCard.vue';

const props = defineProps({
  repo: {
    type: Object,
    required: true,
  },
});

if (!props.repo.state.data.length) {
  props.repo.fetchData();
}

const isMuted = ref(true);
const swiper = ref(null);

watch(isMuted, () => {
  swiper.value.slides[swiper.value.activeIndex].querySelector('video').muted = isMuted.value;
})

const onSlideChange = ($event) => {
  swiper.value = $event;
  swiper.value.slides.map((el) => {
    const video = el.querySelector('video');
    video.muted = isMuted.value;
    video.currentTime = 0;
    video.pause();
  });

  swiper.value.slides[swiper.value.activeIndex].querySelector('video').play();
};
</script>

<template>
  <div class="VideosSlider">
    <div class="VideosSlider__sound-icon" @click="isMuted = !isMuted">
      <IconSoundOff v-if="isMuted" />
      <IconSoundOn v-else />
    </div>

    <div
      v-if="repo.state.isLoading && !repo.state.data.length"
      class="VideosSlider__loading"
    >
      Loading...
    </div>

    <Swiper
      v-else
      :slides-per-view="1"
      :space-between="50"
      direction="vertical"
      class="VideosSlider__slider"
      @swiper="onSlideChange"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        v-for="video in repo.state.data"
        :key="video.id"
        class="VideosSlider__slide"
        @click="isMuted = !isMuted"
      >
        <template v-slot="{ isActive }">
          <VideoCard
            :video="video"
            :is-muted="isMuted"
            :is-playing="isActive"
          />
        </template>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss">
.VideosSlider {
  position: relative;
  height: 100%;

  &__sound-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 16px;
    z-index: 99;
    cursor: pointer;
    background: rgba(black, 0.5);
    color: white;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  &__loading {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__slider {
    height: 100%;
  }

  &__slide {}
}
</style>
