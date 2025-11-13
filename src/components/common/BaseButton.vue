<template>
  <component :is="componentTag" class="base-button" v-bind="componentAttrs">
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  href: {
    type: String,
    default: null,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: "button",
  },
});

const componentTag = computed(() => {
  if (props.to) return RouterLink;
  if (props.href) return "a";
  return "button";
});

const componentAttrs = computed(() => {
  if (props.to) {
    return { to: props.to };
  }

  if (props.href) {
    return { href: props.href };
  }

  return { type: props.type };
});
</script>
