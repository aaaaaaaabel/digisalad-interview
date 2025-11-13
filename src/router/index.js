import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("../views/HomePage.vue");
const WorksPage = () => import("../views/WorksPage.vue");
const AboutPage = () => import("../views/AboutPage.vue");
const ContactPage = () => import("../views/ContactPage.vue");
const WorkDetailPage = () => import("../views/WorkDetailPage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/works",
    name: "works",
    component: WorksPage,
  },
  {
    path: "/works/:slug",
    name: "work-detail",
    component: WorkDetailPage,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
