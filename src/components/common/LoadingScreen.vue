<template>
  <div class="loading-screen" :class="{ 'is-hide': isHiding }">
    <div class="sparkle" v-for="n in 5" :key="n"></div>

    <div class="salad-bowl">
      <div class="ingredient lettuce"></div>
      <div class="ingredient tomato"></div>
      <div class="ingredient corn"></div>
      <div class="ingredient carrot"></div>
      <div class="ingredient cucumber"></div>

      <div class="bowl"></div>
    </div>

    <div class="loading-logo">
      <img :src="headerLogo" alt="DigiSalad" />
    </div>
    <div class="decoration-line"></div>
    <div class="loading-subtitle">DIGITAL CREATIVE AGENCY</div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import headerLogo from "@/assets/images/header-logo.png";

const emit = defineEmits(["finished"]);

const isHiding = ref(false);

let hideTimer;
let disposeTimer;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    emit("finished");
    return;
  }

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  hideTimer = window.setTimeout(() => {
    isHiding.value = true;
  }, 2800);

  disposeTimer = window.setTimeout(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    emit("finished");
  }, 3600);
});

onBeforeUnmount(() => {
  window.clearTimeout(hideTimer);
  window.clearTimeout(disposeTimer);
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
});
</script>

<style scoped lang="scss">
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  overflow: hidden;
  transition: opacity 0.8s ease, visibility 0.8s ease;

  &.is-hide {
    opacity: 0;
    visibility: hidden;
  }
}

.salad-bowl {
  position: relative;
  width: clamp(220px, 30vw, 300px);
  height: clamp(220px, 30vw, 300px);
  margin-bottom: clamp(24px, 4vw, 40px);
}

.bowl {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(200px, 26vw, 250px);
  height: clamp(100px, 16vw, 120px);
  background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
  border-radius: 0 0 125px 125px;
  box-shadow: inset 0 -10px 20px rgba(0, 0, 0, 0.1),
    0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: clamp(8px, 1.5vw, 10px);
    left: clamp(8px, 1.5vw, 12px);
    right: clamp(8px, 1.5vw, 12px);
    height: clamp(28px, 4vw, 40px);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 100%
    );
    border-radius: 50%;
  }
}

.ingredient {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: ingredientDrop 0.6s ease-out forwards;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
}

.lettuce {
  width: clamp(48px, 8vw, 60px);
  height: clamp(48px, 8vw, 60px);
  left: 50%;
  top: clamp(16px, 3vw, 20px);
  transform: translateX(-50%) rotate(-15deg);
  background: linear-gradient(135deg, #7bed9f 0%, #70a1ff 100%);
  clip-path: polygon(
    50% 0%,
    80% 20%,
    100% 60%,
    80% 100%,
    20% 100%,
    0% 60%,
    20% 20%
  );
  animation-delay: 0.2s;
}

.tomato {
  width: clamp(40px, 6vw, 50px);
  height: clamp(40px, 6vw, 50px);
  left: 30%;
  top: clamp(40px, 6vw, 50px);
  background: radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a6f);
  animation-delay: 0.4s;

  &::before {
    content: "🍅";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: clamp(28px, 5vw, 40px);
  }
}

.corn {
  width: clamp(38px, 6vw, 45px);
  height: clamp(38px, 6vw, 45px);
  right: 30%;
  top: clamp(48px, 7vw, 60px);
  background: radial-gradient(circle at 30% 30%, #feca57, #ff9ff3);
  animation-delay: 0.6s;

  &::before {
    content: "🌽";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: clamp(24px, 4.5vw, 35px);
  }
}

.carrot {
  width: clamp(32px, 5.5vw, 40px);
  height: clamp(32px, 5.5vw, 40px);
  left: 25%;
  top: clamp(80px, 11vw, 100px);
  background: radial-gradient(circle at 30% 30%, #ff9ff3, #feca57);
  animation-delay: 0.8s;

  &::before {
    content: "🥕";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: clamp(22px, 4vw, 32px);
  }
}

.cucumber {
  width: clamp(36px, 6vw, 48px);
  height: clamp(36px, 6vw, 48px);
  right: 25%;
  top: clamp(72px, 10vw, 90px);
  background: radial-gradient(circle at 30% 30%, #7bed9f, #2ed573);
  animation-delay: 1s;

  &::before {
    content: "🥒";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: clamp(26px, 4.5vw, 38px);
  }
}

@keyframes ingredientDrop {
  0% {
    opacity: 0;
    transform: translateY(-200px) rotate(0deg) scale(0.5);
  }

  60% {
    opacity: 1;
    transform: translateY(10px) rotate(180deg) scale(1.1);
  }

  80% {
    transform: translateY(-5px) rotate(200deg) scale(0.95);
  }

  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
  }
}

.loading-logo {
  animation: logoReveal 1s ease-out 1.2s both;

  img {
    width: clamp(120px, 18vw, 180px);
    height: auto;
    object-fit: contain;
    display: block;
  }
}

@keyframes logoReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
    letter-spacing: 10px;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: 4px;
  }
}

.decoration-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #4facfe, transparent);
  margin: clamp(8px, 2vw, 15px) 0;
  animation: lineExpand 0.6s ease-out 1.7s both;
}

@keyframes lineExpand {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 60px;
    opacity: 1;
  }
}

.loading-subtitle {
  font-size: clamp(14px, 2.2vw, 18px);
  color: rgba(44, 62, 80, 0.9);
  letter-spacing: 3px;
  animation: subtitleReveal 0.8s ease-out 1.5s both;
}

@keyframes subtitleReveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 0.7;
    transform: translateY(0);
  }
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: sparkleFloat 2s ease-in-out infinite;

  &:nth-child(1) {
    left: 15%;
    top: 20%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 85%;
    top: 30%;
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    left: 10%;
    top: 70%;
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    left: 90%;
    top: 65%;
    animation-delay: 0.9s;
  }

  &:nth-child(5) {
    left: 50%;
    top: 15%;
    animation-delay: 1.2s;
  }
}

@keyframes sparkleFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }

  50% {
    transform: translateY(-20px) scale(1.5);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .loading-screen {
    padding: 24px;
  }
}
</style>
