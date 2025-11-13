<template>
  <section
    ref="sectionRef"
    class="brand-experience scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="brand-experience__container">
      <header class="brand-experience__header">
        <div class="heading-wave brand-experience__heading">
          <h2 class="brand-experience__title">
            <span>OUR BRAND EXPERIENCE</span>
            <span class="brand-experience__title-dot"></span>
          </h2>
          <WavePattern class="heading-wave__underline brand-experience__wave" />
        </div>
        <p class="brand-experience__intro">
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
      </header>

      <div class="brand-experience__logo-wall-wrapper">
        <div
          class="brand-experience__logo-wall"
          :class="{ 'is-expanded': isExpanded }"
        >
          <figure
            v-for="(brand, index) in brandLogos"
            :key="brand.name"
            class="brand-experience__logo"
            :class="{
              'brand-experience__logo--hidden': !isExpanded && index >= 9,
            }"
          >
            <img :src="brand.logo" :alt="`${brand.name} Logo`" />
          </figure>
        </div>
        <div
          v-if="brandLogos.length > 9"
          class="brand-experience__gradient-overlay"
          :class="{ 'is-hidden': isExpanded }"
        ></div>
        <button
          v-if="brandLogos.length > 9"
          type="button"
          class="brand-experience__expand-btn"
          @click="toggleExpand"
        >
          {{ isExpanded ? "收起" : "Show All" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import WavePattern from "../common/WavePattern.vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

// 滾動進入動畫
const { elementRef: sectionRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "-50px", // 提前 50px 觸發
  once: true,
});

const logoModules = import.meta.glob(
  "@/assets/images/brands/logos/*.{png,svg}",
  {
    eager: true,
    import: "default",
  }
);

const brandLogos = computed(() =>
  Object.entries(logoModules)
    .filter(([path]) => !path.includes("brand-placeholder"))
    .map(([, logo], index) => ({
      name: `Brand ${index + 1}`,
      logo,
    }))
);

const isExpanded = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
