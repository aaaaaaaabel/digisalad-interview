<template>
  <section class="section works-page">
    <div class="section__container">
      <SectionTitle eyebrow="Our Works" title="作品集" />
      <div class="works-page__grid">
        <article v-for="work in works" :key="work.id" class="works-page__card">
          <router-link
            :to="{ name: 'work-detail', params: { slug: work.slug } }"
          >
            <div class="works-page__cover">
              <img :src="work.cover" :alt="work.title" />
            </div>
            <h3>{{ work.title }}</h3>
            <p>{{ work.category }}</p>
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSEO } from "@/composables/useSEO";
import SectionTitle from "../components/common/SectionTitle.vue";
import { works } from "../data/works";

// SEO 設定
useSEO({
  title: "作品集",
  description:
    "瀏覽 DigiSalad 的數位作品集，包含網站設計、UX/UI 設計、品牌設計、數位行銷等成功案例。我們為各行業客戶打造卓越的數位體驗。",
  keywords:
    "網站設計案例,UX設計作品,UI設計作品,數位行銷案例,品牌設計案例,網站開發案例,台灣網站設計作品",
  url: "/works",
});
</script>

<style scoped lang="scss">
.works-page {
  &__grid {
    margin-top: 48px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  &__card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(4, 47, 59, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    h3 {
      margin: 16px 16px 8px;
      font-size: 20px;
    }

    p {
      margin: 0 16px 24px;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &__cover {
    position: relative;
    padding-top: 65%;
    background: rgba(0, 0, 0, 0.05);

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
