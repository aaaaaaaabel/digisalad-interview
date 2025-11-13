<template>
  <section
    id="about"
    ref="sectionRef"
    class="section about scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="section__container about__container">
      <header class="about__header">
        <div class="heading-wave about__heading">
          <h2 class="about__title">
            <span>ABOUT DIGISALAD</span>
            <span class="about__title-dot"></span>
          </h2>
          <WavePattern class="heading-wave__underline about__wave" />
        </div>
      </header>

      <div
        class="about__media"
        :style="thumbnailStyle"
        :class="{ 'is-playing': isVideoPlaying }"
      >
        <iframe
          v-if="isVideoPlaying"
          :src="videoSrc"
          title="About DigiSalad"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <button v-else type="button" class="about__play" @click="playVideo">
          <span class="about__play-icon"></span>
        </button>
      </div>
      <div class="about__content">
        <p>
          Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
          ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta.
          Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis.
          Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci.
          Donec id dignissim nunc. Donec elit ante, eleifend a dolor et,
          venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem
          elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc
          leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis
          molestie faucibus.
        </p>
        <button type="button" class="about__cta">View More</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import WavePattern from "../common/WavePattern.vue";

// 滾動進入動畫
const { elementRef: sectionRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "-50px",
  once: true,
});

const YOUTUBE_ID = "IeIRJ9jZ5Ro";
const isVideoPlaying = ref(false);

const videoSrc = computed(
  () =>
    `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`
);

const thumbnailStyle = computed(() => ({
  backgroundImage: `url(https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg)`,
}));

const playVideo = () => {
  isVideoPlaying.value = true;
};
</script>
