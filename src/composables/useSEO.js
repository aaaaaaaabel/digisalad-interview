import { useHead } from "@vueuse/head";

/**
 * SEO Meta 標籤管理 Composable
 * 用於動態設置頁面的 SEO 資訊
 *
 * @param {Object} options - SEO 配置選項
 * @param {string} options.title - 頁面標題
 * @param {string} options.description - 頁面描述
 * @param {string} options.keywords - 關鍵詞（可選）
 * @param {string} options.image - Open Graph 圖片 URL（可選）
 * @param {string} options.url - 頁面 URL（可選，預設為當前路徑）
 * @param {string} options.type - Open Graph 類型（可選，預設為 'website'）
 */
export function useSEO(options) {
  const {
    title,
    description,
    keywords,
    image = "https://digisalad.com/og-image.jpg",
    url,
    type = "website",
  } = options;

  const baseUrl = "https://digisalad.com";
  let currentUrl = baseUrl;

  if (typeof window !== "undefined") {
    if (url) {
      currentUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    } else {
      currentUrl = window.location.href;
    }
  } else if (url) {
    currentUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  }

  const fullTitle = title
    ? `${title} | DigiSalad - 台灣數位創意公司`
    : "DigiSalad - 台灣數位創意公司 | 網站設計、UX/UI 設計、數位行銷";

  useHead({
    title: fullTitle,
    meta: [
      // 基礎 Meta
      {
        name: "description",
        content:
          description ||
          "DigiSalad 是台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務。",
      },
      {
        name: "keywords",
        content:
          keywords ||
          "台灣網站設計,台北網站設計,UX設計,UI設計,數位行銷,品牌設計,網站開發,數位創意公司",
      },
      {
        name: "author",
        content: "DigiSalad",
      },
      // Open Graph
      {
        property: "og:type",
        content: type,
      },
      {
        property: "og:url",
        content: currentUrl,
      },
      {
        property: "og:title",
        content: fullTitle,
      },
      {
        property: "og:description",
        content:
          description ||
          "DigiSalad 是台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務。",
      },
      {
        property: "og:image",
        content: image,
      },
      {
        property: "og:locale",
        content: "zh_TW",
      },
      {
        property: "og:site_name",
        content: "DigiSalad",
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:url",
        content: currentUrl,
      },
      {
        name: "twitter:title",
        content: fullTitle,
      },
      {
        name: "twitter:description",
        content:
          description ||
          "DigiSalad 是台灣專業的數位創意公司，提供網站設計、UX/UI 設計、數位行銷、品牌設計等服務。",
      },
      {
        name: "twitter:image",
        content: image,
      },
    ],
    link: [
      {
        rel: "canonical",
        href: currentUrl,
      },
    ],
  });
}
