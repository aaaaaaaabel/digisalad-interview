<template>
  <div class="section-title" :class="[`section-title--${align}`]">
    <p v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title__heading">{{ title }}</h2>
    <p v-if="$slots.description" class="section-title__description">
      <slot name="description" />
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  eyebrow: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "center",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});
</script>
