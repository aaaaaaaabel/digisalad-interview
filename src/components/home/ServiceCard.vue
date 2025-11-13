<template>
  <article class="service-card">
    <div class="service-card__icon">
      <img :src="iconSrc" :alt="`${title} icon`" />
    </div>
    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__description">
      <slot />
    </p>
    <BaseButton v-if="cta" class="service-card__button base-button--outline">{{
      cta
    }}</BaseButton>
  </article>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "../common/BaseButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cta: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: true,
  },
});

const iconSrc = computed(() => props.icon);
</script>
