<template>
  <section
    ref="sectionRef"
    class="hero scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="hero__background">
      <div class="hero__video">
        <iframe
          src="https://www.youtube.com/embed/8_4JRK4QkqU?autoplay=1&mute=1&loop=1&playlist=8_4JRK4QkqU&controls=0&showinfo=0&modestbranding=1"
          title="DigiSalad Hero Background"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__container">
      <div class="hero__content">
        <img :src="saladLogo" alt="DigiSalad logo" />
        <h1 class="hero__heading">
          <span class="hero__line">WE CREATE</span>
          <span class="hero__line">AMAZING</span>
          <span class="hero__line hero__line--highlight">
            DIGITAL EXPERIENCES
            <span class="hero__highlight"></span>
            <span class="hero__dot"></span>
          </span>
        </h1>
      </div>
    </div>
    <div class="hero__badge">
      <span class="hero__badge-line"></span>
      <span class="hero__badge-text">DIGITAL AGENCY</span>
    </div>
    <button type="button" class="hero__scrolldown" @click="scrollToAbout">
      <img :src="saladScrolldown" alt="scroll down" />
      <p>TASTE US NOW!</p>
      <span class="hero__scrolldown-line"></span>
    </button>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import saladLogo from "@/assets/images/salad_white_logo.png";
import saladScrolldown from "@/assets/images/srcolldown_img.png";

// 滾動進入動畫（首屏立即顯示）
const { elementRef: sectionRef, isVisible } = useScrollAnimation({
  threshold: 0,
  rootMargin: "0px",
  once: true,
});

// 首屏立即顯示
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const scrollToAbout = () => {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
