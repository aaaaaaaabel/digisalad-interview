<template>
  <svg class="wave-pattern-container" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        :id="patternId"
        x="0"
        y="0"
        :width="patternWidth"
        :height="patternHeight"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="wavePath"
          fill="none"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>

<script setup>
import { computed, toRef, useId } from "vue";

const props = defineProps({
  stroke: {
    type: String,
    default: "#26c6d0",
  },
  strokeWidth: {
    type: Number,
    default: 8,
  },
  patternWidth: {
    type: Number,
    default: 40,
  },
  patternHeight: {
    type: Number,
    default: 24,
  },
  amplitude: {
    type: Number,
    default: 8,
  },
});

const stroke = toRef(props, "stroke");
const strokeWidth = toRef(props, "strokeWidth");
const patternWidth = toRef(props, "patternWidth");
const patternHeight = toRef(props, "patternHeight");
const amplitude = toRef(props, "amplitude");

const baseline = computed(() => patternHeight.value / 2);
const controlX = computed(() => patternWidth.value / 4);
const halfWidth = computed(() => patternWidth.value / 2);

const wavePath = computed(
  () =>
    `M0 ${baseline.value} Q ${controlX.value} ${
      baseline.value - amplitude.value
    }, ${halfWidth.value} ${baseline.value} T ${patternWidth.value} ${
      baseline.value
    }`
);

const uid = useId();
const patternId = `wave-pattern-${uid}`;
</script>
