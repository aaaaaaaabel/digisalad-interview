<template>
  <transition name="menu-fade">
    <div
      v-if="modelValue"
      :class="['menu-popup', { 'is-open': modelValue }]"
      @click.self="close"
    >
      <div
        class="menu-popup__backdrop"
        :style="{ backgroundImage: `url(${popupBg})` }"
      ></div>

      <div id="app-menu" class="menu-popup__inner">
        <button type="button" class="menu-popup__close" @click="close">
          <span></span>
          <span></span>
        </button>

        <header class="menu-popup__header">
          <img class="menu-popup__logo" :src="logo" alt="DigiSalad" />
        </header>

        <div class="menu-popup__grid">
          <router-link
            v-for="item in menuCards"
            :key="item.title"
            :to="item.to"
            class="menu-card"
            :class="[
              `menu-card--${item.area}`,
              { 'menu-card--light': item.light },
            ]"
            :style="cardStyle(item)"
            @click="close"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              :alt="`${item.title} icon`"
              class="menu-card__icon"
              :class="`menu-card__icon--${item.area}`"
            />
            <div class="menu-card__content">
              <span class="menu-card__subtitle">{{ item.subtitle }}</span>
              <span class="menu-card__title">
                {{ item.title }}
                <span
                  class="menu-card__dot"
                  :style="{ background: item.dot }"
                ></span>
              </span>
            </div>
            <span class="menu-card__arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onBeforeUnmount, watch } from "vue";
import logo from "@/assets/images/salad_white_logo.png";
// bg
import popupBg from "@/assets/images/popup-menu/popup_BG.png";
import aboutBg from "@/assets/images/popup-menu/about_bg.png";
import careerBg from "@/assets/images/popup-menu/career_bg.png";
import insightBg from "@/assets/images/popup-menu/insight_bg.png";
import servicesBg from "@/assets/images/popup-menu/services_bg.png";
import worksBg from "@/assets/images/popup-menu/works_bg.png";
// icons
import aboutIcon from "@/assets/images/popup-menu/about-us_icon.png";
import careerIcon from "@/assets/images/popup-menu/career_icon.png";
import insightIcon from "@/assets/images/popup-menu/insight_icon.png";
import servicesIcon from "@/assets/images/popup-menu/services_services_icon.png";
import worksIcon from "@/assets/images/popup-menu/works_icon.png";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const menuCards = [
  {
    title: "ABOUT US",
    subtitle: "EMPOWERING BRANDS",
    eyebrow: "EMPOWERING BRANDS",
    icon: aboutIcon,
    to: "/about",
    gradient: "rgba(28, 169, 203, 0.8)",
    overlay: `url(${aboutBg})`,
    dot: "#ff6f8f",
    area: "about",
    delay: 0,
    motion: { x: "-52px", y: "26px", rotate: "-6deg" },
  },
  {
    title: "CAREERS",
    subtitle: "BE COOL WITH US",
    eyebrow: "BE COOL WITH US",
    icon: careerIcon,
    to: "/",
    gradient: "rgba(255, 160, 89, 0.6)",
    overlay: `url(${careerBg})`,
    dot: "#ff6f8f",
    area: "careers",
    delay: 1,
    motion: { x: "0px", y: "-48px", rotate: "4deg" },
  },
  {
    title: "SERVICES",
    subtitle: "AREAS OF EXPERTISE",
    eyebrow: "AREAS OF EXPERTISE",
    icon: servicesIcon,
    to: "/works",
    gradient: "rgba(79, 57, 159, 0.8)",
    overlay: `url(${servicesBg})`,
    dot: "#ff6f8f",
    area: "services",
    delay: 2,
    motion: { x: "48px", y: "32px", rotate: "6deg" },
  },
  {
    title: "WORKS",
    subtitle: "CASE STUDIES",
    eyebrow: "CASE STUDIES",
    icon: worksIcon,
    to: "/works",
    gradient: "rgba(218, 69, 107, 0.8)",
    overlay: `url(${worksBg})`,
    dot: "#2dd4d4",
    area: "works",
    delay: 3,
    motion: { x: "-44px", y: "36px", rotate: "-5deg" },
  },
  {
    title: "INSIGHTS",
    subtitle: "OUR STRATEGIES",
    eyebrow: "OUR STRATEGIES",
    icon: insightIcon,
    to: "/works",
    gradient: "rgba(56, 187, 134, 0.8)",
    overlay: `url(${insightBg})`,
    dot: "#ff6f8f",
    area: "insights",
    delay: 4,
    motion: { x: "0px", y: "52px", rotate: "3deg" },
  },
  {
    title: "CONTACT",
    subtitle: "START YOUR JOURNEY WITH US",
    eyebrow: "START YOUR JOURNEY WITH US",
    to: "/contact",
    gradient: "rgba(251, 252, 252, 01)",
    overlay: "none",
    dot: "#26c6d0",
    area: "contact",
    light: true,
    delay: 5,
    motion: { x: "48px", y: "28px", rotate: "4deg" },
  },
];

const cardStyle = (item) => ({
  "--menu-card-bg": item.gradient,
  "--menu-card-overlay": item.overlay,
  "--menu-card-delay": item.delay ?? 0,
  "--menu-card-offset-x": item.motion?.x ?? "0px",
  "--menu-card-offset-y": item.motion?.y ?? "32px",
  "--menu-card-rotate": item.motion?.rotate ?? "0deg",
});

const close = () => emit("update:modelValue", false);

const lockScroll = (shouldLock) => {
  document.body.style.overflow = shouldLock ? "hidden" : "";
  document.documentElement.style.overflow = shouldLock ? "hidden" : "";
};

watch(
  () => props.modelValue,
  (val) => {
    lockScroll(val);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  lockScroll(false);
});
</script>
