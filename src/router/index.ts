import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: '/edit'
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("@/views/edit/index.vue"),
    },
    {
      path: "/show/:cid",
      name: "show",
      component: () => import("@/views/show/index.vue"),
    },
  ],
});

export default router;
