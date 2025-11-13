# DigiSalad 官網專案

台灣專業數位創意公司的官方網站，採用 Vue 3 + Vite 建置，具備完整的 SEO 優化、流暢的動畫效果與響應式設計。

---

## 📋 目錄

- [動畫效果](#動畫效果)
- [SEO 優化](#seo-優化)
- [專案結構](#專案結構)

---

## 動畫效果

本專案實現了多種動畫效果，提升使用者體驗與視覺吸引力。

### 1. 滾動進入動畫 (Scroll Fade-in Animation)

**實現方式：** 使用 Intersection Observer API + CSS Transition

**功能特點：**

- 當元素進入視窗時觸發淡入動畫
- 支援自訂觸發閾值（threshold）與根邊距（rootMargin）
- 可設定是否只觸發一次（once）
- 包含位移、縮放與模糊效果，讓動畫更豐富

**使用範例：**

```vue
<script setup>
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const { elementRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: "-50px",
  once: true,
});
</script>

<template>
  <section
    ref="elementRef"
    class="scroll-fade-in"
    :class="{ 'is-visible': isVisible }"
  >
    <!-- 內容 -->
  </section>
</template>
```

**動畫效果：**

- `opacity`: 0 → 1
- `transform`: translateY(40px) scale(0.96) → translateY(0) scale(1)
- `filter`: blur(8px) → blur(0)
- 持續時間：1 秒
- 緩動函數：`cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**應用位置：**

- Hero Section（首屏立即顯示）
- About Section
- Feature Cluster Section
- Brands Section
- Works Carousel Section

---

### 2. 圖標晃動動畫 (Icon Wiggle Animation)

**實現方式：** CSS Keyframes Animation

**功能特點：**

- 當滑鼠懸停在服務卡片上時，圖標會產生活潑的晃動效果
- 結合位移、旋轉與縮放，創造可愛的互動感

**動畫關鍵幀：**

```scss
@keyframes iconWiggle {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  10% {
    transform: translate(-3px, -2px) rotate(-5deg) scale(1.05);
  }
  // ... 更多關鍵幀
}
```

**應用位置：**

- Feature Cluster 服務卡片（桌面版 hover 時）

---

### 3. 卡片 Hover 效果

**實現方式：** CSS Transition + Transform

**功能特點：**

- 桌面版 hover 時，服務卡片會轉換為移動端 Swiper 卡片樣式
- 包含圓角、半透明背景、模糊效果與陰影
- 卡片輕微上移，圖標同時播放晃動動畫

**樣式效果：**

- `border-radius: 28px`
- `background: rgba(255, 255, 255, 0.15)`
- `backdrop-filter: blur(10px)`
- `box-shadow: 0 18px 36px rgba(0, 0, 0, 0.16)`
- `transform: translateY(-4px)`

**應用位置：**

- Feature Cluster 服務卡片（僅桌面版 > 768px）

---

### 4. 選單彈出動畫 (Menu Popup Animation)

**實現方式：** CSS Animation + Stagger Delay

**功能特點：**

- 選單卡片依序進入，每個卡片有延遲時間
- 包含位移、旋轉與縮放效果
- 支援 `prefers-reduced-motion` 無障礙設定

**動畫參數：**

- 持續時間：0.72 秒
- 緩動函數：`cubic-bezier(0.2, 0.68, 0.35, 1.05)`
- 延遲計算：`calc(0.28s + var(--menu-card-delay, 0) * 0.12s)`

**應用位置：**

- MenuPopup 組件

---

### 5. 載入畫面動畫 (Loading Screen Animation)

**實現方式：** CSS Animation + JavaScript Timer

**功能特點：**

- **沙拉碗動畫：** 五種食材（生菜、番茄、玉米、胡蘿蔔、小黃瓜）依序從上方掉落至碗中
- **Logo 淡入效果：** 使用 `logoReveal` 動畫，從下方淡入並伴隨位移
- **裝飾線條展開：** 漸層線條從中心向兩側展開
- **副標題淡入：** "DIGITAL CREATIVE AGENCY" 文字淡入效果
- **閃爍星星效果：** 背景中五個閃爍的星星元素，營造活潑氛圍
- **自動隱藏機制：** 2.8 秒後開始淡出，3.6 秒後完全移除
- **無障礙支援：** 檢測 `prefers-reduced-motion`，若啟用則跳過動畫直接顯示內容
- **滾動鎖定：** 載入期間鎖定頁面滾動，完成後自動解除

**動畫時序：**

```
0.0s  - 食材開始掉落（依序延遲 0.2s, 0.4s, 0.6s, 0.8s, 1.0s）
1.2s  - Logo 淡入動畫開始
1.5s  - 副標題淡入動畫開始
1.7s  - 裝飾線條展開動畫開始
2.8s  - 開始淡出（is-hide class）
3.6s  - 完全移除並觸發 finished 事件
```

**食材掉落動畫細節：**

- **動畫名稱：** `ingredientDrop`
- **持續時間：** 0.6 秒
- **緩動函數：** `ease-out`
- **動畫效果：**
  - 從上方 200px 處開始（`translateY(-200px)`）
  - 掉落過程中旋轉 180 度
  - 到達碗中時有輕微彈跳效果（overshoot）
  - 最終穩定在碗中位置

**背景效果：**

- **漸層背景：** `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`
- **閃爍星星：** 5 個星星元素，使用 `sparkleFloat` 動畫
  - 持續時間：2 秒
  - 無限循環
  - 上下浮動並伴隨縮放與透明度變化

**使用範例：**

```vue
<template>
  <LoadingScreen v-if="showLoading" @finished="handleLoadingFinished" />
</template>

<script setup>
import { ref } from "vue";
import LoadingScreen from "./components/common/LoadingScreen.vue";

const showLoading = ref(true);

const handleLoadingFinished = () => {
  showLoading.value = false;
};
</script>
```

**應用位置：**

- App.vue（全局載入畫面）

---

## UX 優化

本專案針對不同裝置與使用情境，實現了多項 UX 優化策略，確保最佳的使用者體驗。

### 1. Service 手機版 Swiper 卡片式滑動

**實現方式：** Swiper.js + 響應式條件渲染

**功能特點：**

- **桌面版（> 768px）：** 使用 Grid 網格佈局，顯示所有服務卡片
- **手機版（≤ 768px）：** 自動切換為 Swiper 卡片式滑動
- **卡片樣式：** 半透明背景、圓角、模糊效果、陰影
- **滑動體驗：** 支援觸摸滑動、阻力效果、卡片吸附

**技術細節：**

- 使用 `matchMedia` API 監聽螢幕寬度變化
- 動態切換 `showDesktopGrid` 與 `showMobileSwiper`
- Swiper 設定：
  - `slides-per-view: 'auto'`（自動計算卡片寬度）
  - `space-between: 16`（卡片間距）
  - `grab-cursor: true`（觸摸時顯示抓取游標）
  - `resistance-ratio: 0.85`（滑動阻力）
  - `watch-slides-progress: true`（監聽滑動進度）

**卡片樣式（手機版）：**

```scss
border-radius: 28px;
background: rgba(255, 255, 255, 0.15);
border: 1px solid rgba(255, 255, 255, 0.12);
backdrop-filter: blur(10px);
box-shadow: 0 18px 36px rgba(0, 0, 0, 0.16);
```

**應用位置：**

- FeatureCluster 組件

---

### 2. Brand Logo 牆手機版 Show All 功能

**實現方式：** Vue 響應式狀態 + CSS 漸層遮罩

**功能特點：**

- **初始狀態：** 手機版僅顯示前 9 個 Logo，其餘隱藏
- **漸層遮罩：** 底部使用半透明白色漸層，提示還有更多內容
- **Show All 按鈕：** 點擊後展開顯示所有 Logo
- **平滑過渡：** 展開/收起時有平滑的動畫效果

**實現細節：**

- 使用 `isExpanded` ref 控制展開狀態
- 透過 `brand-experience__logo--hidden` class 控制顯示/隱藏
- 漸層遮罩高度：300px
- 漸層顏色：`rgba(242, 242, 242, ...)`
- 按鈕樣式：與 `feature-cluster__cta-button` 一致

**按鈕文字：**

- 未展開：`"Show All"`
- 已展開：`"收起"`

**應用位置：**

- BrandsSection 組件（僅手機版 ≤ 768px）

---

### 3. 防止水平滾動

**實現方式：** CSS `overflow-x: hidden`

**功能特點：**

- 防止內容超出視窗寬度造成水平滾動
- 確保所有裝置都能正常瀏覽

**應用位置：**

- 全局樣式（`html, body`）
- 各組件容器

---

### 4. 無障礙優化

**實現方式：** 媒體查詢 + 條件渲染

**功能特點：**

- **`prefers-reduced-motion`：** 檢測使用者是否偏好減少動畫
- **自動跳過動畫：** 若啟用，LoadingScreen 直接顯示內容
- **鍵盤導航：** 所有互動元素都支援鍵盤操作
- **ARIA 標籤：** 適當的 `alt`、`aria-label` 等屬性

**應用位置：**

- LoadingScreen 組件
- 所有互動元素

---

## SEO 優化

本專案實現了完整的 SEO 優化策略，確保搜尋引擎能正確索引與理解網站內容。

### 1. Meta 標籤管理

**實現方式：** `@vueuse/head` + 自訂 `useSEO` Composable

**功能特點：**

- 動態設定每個頁面的 title、description、keywords
- 自動生成完整的 Open Graph 標籤（Facebook 分享）
- 自動生成 Twitter Card 標籤
- 支援自訂 canonical URL

**使用範例：**

```vue
<script setup>
import { useSEO } from "@/composables/useSEO";

useSEO({
  title: "首頁",
  description: "DigiSalad 是台灣專業的數位創意公司...",
  keywords: "台灣網站設計,UX設計,UI設計...",
  url: "/",
  image: "https://digisalad.com/og-image.jpg",
  type: "website",
});
</script>
```

**生成的 Meta 標籤：**

- 基礎 Meta：`description`, `keywords`, `author`, `robots`, `googlebot`, `language`, `geo.region`, `geo.placename`
- Open Graph：`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name`
- Twitter Card：`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical Link：`rel="canonical"`

**應用位置：**

- 所有頁面（HomePage, AboutPage, WorksPage, ContactPage, WorkDetailPage）

---

### 2. 結構化資料 (Structured Data / JSON-LD)

**實現方式：** Schema.org JSON-LD

**功能特點：**

- 使用 Schema.org 標準格式
- 幫助搜尋引擎理解網站結構與內容
- 支援 Rich Snippets 顯示

**實現的 Schema 類型：**

#### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DigiSalad",
  "url": "https://digisalad.com",
  "logo": "https://digisalad.com/logo.png",
  "description": "台灣專業的數位創意公司...",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TW",
    "addressRegion": "Taiwan"
  },
  "sameAs": [
    "https://www.facebook.com/digisalad",
    "https://www.instagram.com/digisalad",
    "https://www.linkedin.com/company/digisalad"
  ]
}
```

#### WebSite Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DigiSalad",
  "url": "https://digisalad.com",
  "description": "台灣專業的數位創意公司...",
  "inLanguage": "zh-TW",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://digisalad.com/works?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**應用位置：**

- Organization Schema：HomePage
- WebSite Schema：App.vue（全局）

---

### 3. Sitemap.xml

**位置：** `/public/sitemap.xml`

**功能特點：**

- 列出所有主要頁面
- 設定優先級（priority）與更新頻率（changefreq）
- 包含多語言標記（hreflang）

**包含頁面：**

- `/` (priority: 1.0, changefreq: weekly)
- `/about` (priority: 0.8, changefreq: monthly)
- `/works` (priority: 0.9, changefreq: weekly)
- `/contact` (priority: 0.7, changefreq: monthly)

---

### 4. Robots.txt

**位置：** `/public/robots.txt`

**功能特點：**

- 允許所有搜尋引擎爬取
- 禁止爬取開發相關檔案（node_modules, .git, .vscode）
- 指向 sitemap.xml

---

### 5. HTML 語言標記

**實現方式：** `useHead` 設定 `htmlAttrs.lang`

**設定值：**

- `lang="zh-TW"`（繁體中文）

**應用位置：**

- `index.html`
- `App.vue`（全局設定）

---

### 6. 地理位置標記

**實現方式：** Meta Tags

**標記內容：**

- `geo.region`: TW
- `geo.placename`: Taiwan
- `language`: zh-TW

**目的：** 幫助搜尋引擎了解網站目標地區為台灣

---

## 技術棧

- **框架：** Vue 3 (Composition API)
- **建置工具：** Vite
- **路由：** Vue Router
- **樣式：** SCSS
- **動畫：** CSS Animations + Intersection Observer API
- **SEO：** @vueuse/head
- **輪播：** Swiper.js
- **字體：** Adobe Fonts (Proxima Nova)

---

## 📁 專案結構

```
src/
├── assets/
│   ├── images/          # 圖片資源
│   └── styles/          # 樣式檔案
│       ├── abstracts/   # 變數、混入
│       ├── base/         # 基礎樣式
│       ├── components/   # 組件樣式
│       └── pages/        # 頁面樣式
├── components/
│   ├── common/          # 通用組件
│   ├── home/            # 首頁組件
│   └── layout/          # 佈局組件
├── composables/         # 組合式函數
│   ├── useScrollAnimation.js  # 滾動動畫
│   └── useSEO.js              # SEO 管理
├── views/               # 頁面組件
├── router/              # 路由設定
└── data/                # 資料檔案
```

---

## 📝 注意事項

### 動畫效能優化

- 使用 `will-change` 屬性提示瀏覽器優化
- 使用 `transform` 與 `opacity` 進行動畫（GPU 加速）
- 避免在動畫中使用 `width`、`height`、`top`、`left` 等屬性

### SEO 實踐

- 每個頁面都應設定獨特的 title 與 description
- 確保圖片都有適當的 `alt` 屬性
- 使用語義化 HTML 標籤
- 定期更新 sitemap.xml 的 `lastmod` 日期

### 無障礙設計

- 所有動畫都支援 `prefers-reduced-motion` 媒體查詢
- 使用適當的 ARIA 標籤
- 確保鍵盤導航功能正常
