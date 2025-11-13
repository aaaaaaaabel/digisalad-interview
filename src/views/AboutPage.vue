<template>
  <section class="section about-page">
    <div class="section__container about-page__container">
      <SectionTitle eyebrow="About" title="關於 DigiSalad" align="left">
        <template #description>
          深入了解我們的品牌故事、核心價值以及與客戶並肩作戰的方式。
        </template>
      </SectionTitle>
      <div class="about-page__content">
        <p>
          DigiSalad 成立於 2010
          年，專注於結合策略、創意、科技，打造以使用者體驗為核心的數位產品與服務。團隊成員遍佈策略企劃、設計、前後端、行銷等領域，提供從品牌定位、介面設計，到系統開發與維運的全方位服務。
        </p>
        <p>
          我們相信每個專案都是一次合作與學習的旅程。透過設計衝刺、資料分析與多次迭代，我們與客戶攜手打造能夠真實解決問題、驅動成長的解決方案。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSEO } from "@/composables/useSEO";
import SectionTitle from "../components/common/SectionTitle.vue";

// SEO 設定
useSEO({
  title: "關於我們",
  description:
    "DigiSalad 成立於 2010 年，專注於結合策略、創意、科技，打造以使用者體驗為核心的數位產品與服務。團隊成員遍佈策略企劃、設計、前後端、行銷等領域。",
  keywords:
    "關於DigiSalad,數位創意公司,台灣設計公司,UX設計團隊,網站設計公司,數位行銷公司",
  url: "/about",
});
</script>

<style scoped lang="scss">
.about-page {
  &__container {
    display: grid;
    gap: 32px;
  }

  &__content {
    display: grid;
    gap: 16px;
    font-size: 18px;
    line-height: 1.8;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
