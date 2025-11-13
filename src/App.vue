<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useHead } from "@vueuse/head";

import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import MenuPopup from "./components/layout/MenuPopup.vue";
import LoadingScreen from "./components/common/LoadingScreen.vue";
import { ref } from "vue";

const isMenuOpen = ref(false);
const showLoading = ref(true);

const handleLoadingFinished = () => {
  showLoading.value = false;
};

// 全局結構化資料 - WebSite
onMounted(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DigiSalad",
    url: "https://digisalad.com",
    description:
      "台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務",
    inLanguage: "zh-TW",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://digisalad.com/works?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });
  document.head.appendChild(script);
});

// 全局 Meta 設定
useHead({
  htmlAttrs: {
    lang: "zh-TW",
  },
});
</script>

<template>
  <div>
    <LoadingScreen v-if="showLoading" @finished="handleLoadingFinished" />

    <div class="app-shell">
      <AppHeader
        :is-menu-open="isMenuOpen"
        @toggle-menu="isMenuOpen = !isMenuOpen"
      />
      <main class="app-shell__content">
        <RouterView />
      </main>
      <AppFooter />
      <MenuPopup v-model="isMenuOpen" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
  }
}
</style>
