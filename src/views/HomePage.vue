<template>
  <div class="home-page">
    <HeroSection />
    <AboutSection />
    <FeatureCluster />
    <BrandsSection />
    <WorksCarousel />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import HeroSection from "../components/home/HeroSection.vue";
import AboutSection from "../components/home/AboutSection.vue";
import FeatureCluster from "../components/home/FeatureCluster.vue";
import BrandsSection from "../components/home/BrandsSection.vue";
import WorksCarousel from "../components/home/WorksCarousel.vue";

// SEO 設定
useSEO({
  title: "首頁",
  description:
    "DigiSalad 是台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務。我們致力於創造卓越的數位體驗，幫助品牌在數位世界中脫穎而出。",
  keywords:
    "台灣網站設計,台北網站設計,UX設計,UI設計,數位行銷,品牌設計,網站開發,數位創意公司,響應式網站,電商網站",
  url: "/",
});

// 結構化資料 - Organization
onMounted(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DigiSalad",
    url: "https://digisalad.com",
    logo: "https://digisalad.com/logo.png",
    description:
      "台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TW",
      addressRegion: "Taiwan",
    },
    sameAs: [
      "https://www.facebook.com/digisalad",
      "https://www.instagram.com/digisalad",
      "https://www.linkedin.com/company/digisalad",
    ],
  });
  document.head.appendChild(script);
});
</script>
