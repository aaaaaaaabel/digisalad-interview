<template>
  <section
    ref="sectionRef"
    class="works-showcase scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
    :style="{ '--works-bg-image': `url(${activeWork.cover})` }"
  >
    <div class="works-showcase__backdrop"></div>
    <div class="works-showcase__overlay"></div>

    <div class="works-showcase__container">
      <div class="works-showcase__pagination">
        <span class="works-showcase__pagination-current">{{
          currentDisplay
        }}</span>
        <span class="works-showcase__pagination-divider">/</span>
        <span class="works-showcase__pagination-total">{{ totalDisplay }}</span>
      </div>

      <Swiper
        class="works-showcase__swiper"
        :modules="modules"
        :slides-per-view="1"
        :space-between="40"
        :loop="true"
        :speed="800"
        :keyboard="{ enabled: true }"
        :navigation="navigationOptions"
        @swiper="handleInit"
        @slideChange="handleSlideChange"
      >
        <SwiperSlide v-for="work in works" :key="work.id">
          <div class="works-showcase__slide">
            <div class="works-showcase__image">
              <div
                class="works-showcase__image-frame"
                :style="{ backgroundImage: `url(${work.cover})` }"
                role="img"
                :aria-label="work.title"
              ></div>
            </div>
            <div class="works-showcase__content">
              <p class="works-showcase__label">HIGHLIGHTED SHOWCASE</p>
              <h3 class="works-showcase__title">
                <span>{{ formatTitle(work.title) }}</span>
                <span class="works-showcase__dot"></span>
              </h3>
              <p class="works-showcase__description">{{ work.description }}</p>
            </div>
            <div class="works-showcase__cta-wrapper">
              <RouterLink
                class="works-showcase__cta"
                :to="{ name: 'work-detail', params: { slug: work.slug } }"
              >
                View Project
              </RouterLink>
            </div>
          </div>
        </SwiperSlide>

        <template #container-end>
          <div
            class="works-showcase__nav works-showcase__nav--prev swiper-button-prev"
          ></div>
          <div
            class="works-showcase__nav works-showcase__nav--next swiper-button-next"
          ></div>
        </template>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { works } from "../../data/works";

// 滾動進入動畫
const { elementRef: sectionRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "-50px",
  once: true,
});

const modules = [Navigation, Keyboard, A11y];

const activeIndex = ref(0);

const activeWork = computed(() => works[activeIndex.value] ?? works[0]);
const totalDisplay = computed(() => String(works.length).padStart(2, "0"));
const currentDisplay = computed(() =>
  String(activeIndex.value + 1).padStart(2, "0")
);

const navigationOptions = {
  nextEl: ".works-showcase__nav--next",
  prevEl: ".works-showcase__nav--prev",
};

const handleInit = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const handleSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const formatTitle = (title) =>
  title ? title.toUpperCase().replaceAll(" ", "\n") : "";
</script>
