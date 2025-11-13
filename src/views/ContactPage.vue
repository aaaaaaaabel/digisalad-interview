<template>
  <section class="section contact-page">
    <div class="section__container contact-page__container">
      <SectionTitle eyebrow="Contact" title="與我們聊聊您的專案" />
      <div class="contact-page__content">
        <p>
          想開始新專案或需要重新打造既有產品嗎？留下訊息，我們的顧問會盡快與您聯繫，共同規劃最適合的解決方案。
        </p>
        <form class="contact-page__form">
          <label>
            <span>姓名</span>
            <input type="text" placeholder="您的名字" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="example@digisalad.com" />
          </label>
          <label class="contact-page__full">
            <span>專案需求</span>
            <textarea
              rows="4"
              placeholder="簡述您的專案或目前的挑戰"
            ></textarea>
          </label>
          <BaseButton type="submit">送出</BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSEO } from "@/composables/useSEO";
import BaseButton from "../components/common/BaseButton.vue";
import SectionTitle from "../components/common/SectionTitle.vue";

// SEO 設定
useSEO({
  title: "聯絡我們",
  description:
    "想開始新專案或需要重新打造既有產品嗎？聯絡 DigiSalad，我們的顧問會盡快與您聯繫，共同規劃最適合的解決方案。",
  keywords:
    "聯絡DigiSalad,網站設計諮詢,UX設計服務,數位行銷諮詢,專案合作,台灣數位創意公司聯絡方式",
  url: "/contact",
});
</script>

<style scoped lang="scss">
.contact-page {
  &__container {
    display: grid;
    gap: 32px;
  }

  &__content {
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 25px 45px rgba(4, 47, 59, 0.1);
    padding: 32px;
    display: grid;
    gap: 24px;
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    label {
      display: grid;
      gap: 8px;
      font-size: 14px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(4, 47, 59, 0.6);

      input,
      textarea {
        padding: 14px 16px;
        border-radius: 12px;
        border: 1px solid rgba(4, 47, 59, 0.15);
        font: inherit;
        resize: vertical;
      }
    }

    .contact-page__full {
      grid-column: 1 / -1;
    }

    button {
      grid-column: 1 / -1;
      justify-self: start;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      button {
        justify-self: stretch;
      }
    }
  }
}
</style>
