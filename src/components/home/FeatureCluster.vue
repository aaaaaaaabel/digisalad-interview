<template>
  <section
    ref="sectionRef"
    class="feature-cluster scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="feature-cluster__awards">
      <div class="feature-cluster__awards-content">
        <div class="feature-cluster__awards-text">
          <div class="feature-cluster__section-heading">
            <h2 class="feature-cluster__title">
              <span>AWARDS</span>
              <span class="feature-cluster__dot"></span>
            </h2>
            <WavePattern
              class="feature-cluster__wave feature-cluster__wave--aqua"
            />
          </div>
          <p class="feature-cluster__paragraph">
            Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
            ullamcorper bibendum bibendum. Duis tincidunt urna non pretium
            porta. Nam condimentum vitae ligula vel ornare. Phasellus et tempor
            turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae
            sagittis orci. Donec id dignissim nunc.
          </p>
        </div>

        <div class="feature-cluster__awards-logos">
          <figure
            v-for="(award, index) in awards"
            :key="`award-${index}`"
            class="feature-cluster__award"
          >
            <img :src="award.logo" :alt="award.title" />
          </figure>
        </div>
      </div>
    </div>

    <div class="feature-cluster__ingredients">
      <div class="feature-cluster__container">
        <div
          class="feature-cluster__section-heading feature-cluster__section-heading--center"
        >
          <h2 class="feature-cluster__title feature-cluster__title--light">
            <span>OUR INGREDIENTS</span>
            <span
              class="feature-cluster__dot feature-cluster__dot--light"
            ></span>
          </h2>
          <WavePattern
            class="feature-cluster__wave feature-cluster__wave--white"
            stroke="#585880"
          />
        </div>

        <p class="feature-cluster__intro">
          Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
          ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta.
          Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis.
          Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci.
          Donec id dignissim nunc. Donec elit ante, eleifend a dolor et,
          venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem
          elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc
          leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis
          molestie faucibus.
        </p>

        <button type="button" class="feature-cluster__cta-button">
          OUR SERVICES
        </button>

        <div v-if="showDesktopGrid" class="feature-cluster__services-grid">
          <article
            v-for="service in services"
            :key="service.title"
            class="feature-cluster__service"
          >
            <div class="feature-cluster__service-icon">
              <img :src="service.icon" :alt="`${service.title} icon`" />
            </div>
            <h3 class="feature-cluster__service-title">{{ service.title }}</h3>
            <p class="feature-cluster__service-desc">
              {{ service.description }}
            </p>
            <button type="button" class="feature-cluster__service-button">
              {{ service.ctaLabel }}
            </button>
          </article>
        </div>

        <Swiper
          v-if="showMobileSwiper"
          class="feature-cluster__services-swiper"
          :modules="modules"
          :slides-per-view="'auto'"
          :space-between="16"
          :centered-slides="false"
          :loop="false"
          :grab-cursor="true"
          :resistance-ratio="0.85"
          :slide-to-clicked-slide="false"
          :watch-slides-progress="true"
          :observer="true"
          :observe-parents="true"
          :breakpoints="{
            768: {
              enabled: false,
            },
          }"
          @swiper="onSwiperReady"
          @touch-start="
            (swiper) =>
              console.log('[FeatureCluster] swiper touchStart', {
                translate: swiper.translate,
                progress: swiper.progress,
              })
          "
          @slider-move="
            (swiper, event) =>
              console.log('[FeatureCluster] swiper sliderMove', {
                translate: swiper.translate,
                progress: swiper.progress,
                eventType: event.type,
              })
          "
          @touch-end="
            (swiper) =>
              console.log('[FeatureCluster] swiper touchEnd', {
                translate: swiper.translate,
                progress: swiper.progress,
              })
          "
        >
          <SwiperSlide
            v-for="service in services"
            :key="`mobile-${service.title}`"
            class="feature-cluster__services-slide"
          >
            <article class="feature-cluster__service">
              <div class="feature-cluster__service-icon">
                <img :src="service.icon" :alt="`${service.title} icon`" />
              </div>
              <h3 class="feature-cluster__service-title">
                {{ service.title }}
              </h3>
              <p class="feature-cluster__service-desc">
                {{ service.description }}
              </p>
              <button
                type="button"
                class="feature-cluster__service-button"
                :class="{
                  'feature-cluster__service-button--branding':
                    service.variant === 'branding',
                }"
              >
                {{ service.ctaLabel }}
              </button>
            </article>
          </SwiperSlide>
        </Swiper>

        <a href="#" class="feature-cluster__more-link">
          VIEW MORE DIGISALAD'S INGREDIENTS
        </a>
      </div>
    </div>

    <div class="feature-cluster__testimonial">
      <div class="feature-cluster__testimonial-content">
        <div class="feature-cluster__testimonial-profile">
          <div class="feature-cluster__testimonial-avatar">
            <img :src="founder.photo" :alt="founder.name" />
          </div>
          <div class="feature-cluster__testimonial-author">
            <h4>{{ founder.name }}</h4>
            <p>{{ founder.title }}</p>
          </div>
        </div>

        <div class="feature-cluster__testimonial-text">
          <img
            class="feature-cluster__quotes"
            src="@/assets/images/founder/quote.svg"
            alt=""
            aria-hidden="true"
          />
          <p>
            A great digital work isn't about designing beautiful pages purely.
            It is about context—how do we deliver the
            <span class="feature-cluster__highlight">
              right experience to the right person at the right time.
            </span>
            The most important thing is that your work can engage customers
            anytime, anywhere and let users experience an entire amazing digital
            journey.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

import WavePattern from "../common/WavePattern.vue";
import {
  uxDesignIcon,
  uiDesignIcon,
  websiteDevelopmentIcon,
  mobileAppIcon,
  ecommerceIcon,
  customerLoyaltyIcon,
  digitalTransformationIcon,
  digitalMarketingIcon,
  brandingIcon,
} from "@/assets/images/services";
import awardLogo from "@/assets/images/awards/award-default.png";

// 滾動進入動畫
const { elementRef: sectionRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "-50px",
  once: true,
});

const modules = [Keyboard];

const showMobileSwiper = ref(false);
const showDesktopGrid = computed(() => !showMobileSwiper.value);

const swiperInstance = ref(null);

let servicesMediaQuery = null;

const applySwiperSizing = (swiper) => {
  if (!swiper || swiper.destroyed) {
    console.warn("[FeatureCluster] cannot apply sizing, invalid swiper");
    return;
  }

  try {
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    console.log("[FeatureCluster] sizing applied", {
      width: swiper.width,
      slideWidth: swiper.slides[0]?.offsetWidth,
      slidesLength: swiper.slides.length,
    });
  } catch (err) {
    console.error("[FeatureCluster] applySwiperSizing error:", err);
  }
};

const refreshSwiper = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (swiperInstance.value) {
    console.log("[FeatureCluster] refreshSwiper using instance");
    applySwiperSizing(swiperInstance.value);
    return;
  }

  const swiperEl = document.querySelector(".feature-cluster__services-swiper");
  if (swiperEl && swiperEl.swiper) {
    console.log("[FeatureCluster] refreshSwiper using DOM query");
    applySwiperSizing(swiperEl.swiper);
  } else {
    console.log("[FeatureCluster] refreshSwiper no swiper found");
  }
};

const handleServicesBreakpoint = (event) => {
  showMobileSwiper.value = event.matches;
  if (event.matches) {
    console.log(
      "[FeatureCluster] breakpoint matched <=768, scheduling refresh"
    );
    setTimeout(() => {
      refreshSwiper();
    }, 150);
  } else {
    console.log("[FeatureCluster] breakpoint >768, disable mobile swiper");
  }
};

const evaluateServicesBreakpoint = () => {
  if (!servicesMediaQuery) {
    return;
  }

  showMobileSwiper.value = servicesMediaQuery.matches;
  console.log("[FeatureCluster] evaluate breakpoint", {
    matches: servicesMediaQuery.matches,
  });
};

const onSwiperReady = (swiper) => {
  console.log("[FeatureCluster] onSwiperReady", {
    width: swiper.width,
    slidesEl: swiper.slides?.length,
    params: swiper.params,
  });

  swiperInstance.value = swiper;

  setTimeout(() => {
    if (swiper && !swiper.destroyed) {
      applySwiperSizing(swiper);
    }
  }, 300);
};

onMounted(async () => {
  if (typeof window === "undefined") {
    return;
  }

  servicesMediaQuery = window.matchMedia("(max-width: 768px)");
  evaluateServicesBreakpoint();
  servicesMediaQuery.addEventListener("change", handleServicesBreakpoint);

  if (showMobileSwiper.value) {
    await nextTick();
    setTimeout(() => {
      console.log("[FeatureCluster] initial mount refresh mobile swiper");
      refreshSwiper();
    }, 150);
  }
});

onBeforeUnmount(() => {
  if (servicesMediaQuery) {
    servicesMediaQuery.removeEventListener("change", handleServicesBreakpoint);
  }
});

watch(showMobileSwiper, (value) => {
  console.log("[FeatureCluster] showMobileSwiper changed", { value });
  if (value) {
    setTimeout(() => {
      refreshSwiper();
    }, 100);
  }
});

watch(
  swiperInstance,
  (instance) => {
    console.log("[FeatureCluster] swiperInstance updated", {
      hasInstance: !!instance,
      destroyed: instance?.destroyed,
      width: instance?.width,
    });
  },
  { immediate: true }
);

const awards = [
  {
    logo: awardLogo,
    title: "亚洲智能应用程式比赛大奖",
    subtitle: "YEAR WINNER",
  },
  {
    logo: awardLogo,
    title: "亚洲智能应用程式大奖",
    subtitle: "YEAR WINNER",
  },
  {
    logo: awardLogo,
    title: "亚洲智能应用程式比赛大奖",
    subtitle: "YEAR WINNER",
  },
  {
    logo: awardLogo,
    title: "亚洲智能应用程式大奖",
    subtitle: "YEAR WINNER",
  },
];

const services = [
  {
    title: "UX DESIGN",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: uxDesignIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "UI DESIGN",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: uiDesignIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "WEBSITE DEVELOPMENT",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: websiteDevelopmentIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "MOBILE APP DEVELOPMENT",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: mobileAppIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "ECOMMERCE",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: ecommerceIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "CUSTOMER LOYALTY",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: customerLoyaltyIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "DIGITAL TRANSFORMATION",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: digitalTransformationIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "DIGITAL MARKETING",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: digitalMarketingIcon,
    ctaLabel: "VIEW MORE",
  },
  {
    title: "BRANDING",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare.",
    icon: brandingIcon,
    ctaLabel: "BRANDING",
    variant: "branding",
  },
];

const founder = {
  name: "Tony Ng",
  title: "Founder & Creative Director",
  photo: new URL("@/assets/images/founder/founder_img.png", import.meta.url)
    .href,
};
</script>
