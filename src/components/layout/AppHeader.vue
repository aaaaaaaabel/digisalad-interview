<template>
  <header :class="['app-header', headerClasses]">
    <div class="app-header__container">
      <router-link to="/" class="app-header__logo">
        <img :src="headerLogo" alt="DigiSalad" />
      </router-link>

      <div class="app-header__actions">
        <BaseButton class="app-header__cta">Start Your Project</BaseButton>
        <button
          class="app-header__menu"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="app-menu"
          @click="handleMenuClick"
        >
          <span class="sr-only">
            {{ isMenuOpen ? "Close menu" : "Open menu" }}
          </span>
          <span class="app-header__burger" :class="{ 'is-open': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import BaseButton from "../common/BaseButton.vue";
import headerLogo from "@/assets/images/header-logo.png";

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-menu"]);

const aboutOffsetTop = ref(Infinity);
const isSolid = ref(false);

const updateAboutOffset = () => {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) {
    aboutOffsetTop.value = Infinity;
    return;
  }
  const rect = aboutSection.getBoundingClientRect();
  aboutOffsetTop.value = window.scrollY + rect.top;
};

const updateSolidState = () => {
  if (!Number.isFinite(aboutOffsetTop.value)) {
    updateAboutOffset();
  }
  isSolid.value = window.scrollY >= aboutOffsetTop.value - 40;
};

const handleScroll = () => {
  updateSolidState();
};

const handleResize = () => {
  updateAboutOffset();
  updateSolidState();
};

onMounted(() => {
  updateAboutOffset();
  updateSolidState();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});

const headerClasses = computed(() => ({
  "app-header--solid": isSolid.value || props.isMenuOpen,
}));

const handleMenuClick = () => {
  emit("toggle-menu");
};

const isMenuOpen = computed(() => props.isMenuOpen);
</script>
