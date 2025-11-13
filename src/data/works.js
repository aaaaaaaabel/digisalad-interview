const workImage = (file) =>
  new URL(`../assets/images/works/${file}`, import.meta.url).href;

export const works = [
  {
    id: 1,
    slug: "lp-club-mobile-app",
    title: "LP Club Mobile App",
    category: "Highlighted Showcase",
    description:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis molestie faucibus.",
    cover: workImage("langham_place_cover_1619599592.png"),
  },
  {
    id: 2,
    slug: "digital-dining-experience",
    title: "Digital Dining Experience",
    category: "UX / UI Design",
    description: "打造餐飲集團全新的線上點餐與會員體驗，讓線上線下服務更順暢。",
    cover: workImage("hopewell-ux-ui-app-website_cover_1705563756.jpg"),
  },
  {
    id: 3,
    slug: "smart-banking-platform",
    title: "Smart Banking Platform",
    category: "Fintech Web Platform",
    description: "重新定義數位銀行服務流程，提升客戶使用效率與品牌信任。",
    cover: workImage("megabank_cover_1552880593.jpg"),
  },
  {
    id: 4,
    slug: "omni-retail-experience",
    title: "Omni Retail Experience",
    category: "Omni-channel Experience",
    description: "整合會員、行銷與購物體驗，打造一致且吸睛的全通路互動。",
    cover: workImage("festivalwalk-ux-ui-website_cover_1736490539.png"),
  },
];

export const findWorkBySlug = (slug) =>
  works.find((work) => work.slug === slug);
