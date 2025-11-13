<template>
  <section class="section work-detail" v-if="work">
    <div class="section__container work-detail__container">
      <router-link class="work-detail__back" to="/">← 返回首頁</router-link>
      <h1 class="work-detail__title">{{ work.title }}</h1>
      <p class="work-detail__category">{{ work.category }}</p>
      <div class="work-detail__hero">
        <img :src="work.cover" :alt="work.title" />
      </div>
      <p class="work-detail__description">{{ work.description }}</p>
      <div class="work-detail__cta">
        <BaseButton href="#">聯繫我們</BaseButton>
      </div>
    </div>
  </section>
  <section v-else class="section">
    <div class="section__container">
      <p>找不到此作品，請返回首頁。</p>
      <router-link to="/">回首頁</router-link>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useSEO } from "@/composables/useSEO";
import BaseButton from "../components/common/BaseButton.vue";
import { findWorkBySlug } from "../data/works";

const route = useRoute();
const work = computed(() => findWorkBySlug(route.params.slug));

// 動態 SEO 設定
watch(
  [work, () => route.path],
  ([currentWork, path]) => {
    if (currentWork) {
      useSEO({
        title: `${currentWork.title} - 作品案例`,
        description:
          currentWork.description ||
          `${currentWork.title} - DigiSalad 數位創意作品案例`,
        keywords: `${currentWork.title},網站設計案例,UX設計,UI設計,${currentWork.category}`,
        image: currentWork.cover,
        type: "article",
        url: path,
      });
    } else {
      useSEO({
        title: "找不到作品",
        description: "找不到此作品，請返回首頁。",
        url: path,
      });
    }
  },
  { immediate: true }
);
</script>
