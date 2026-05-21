import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";

const routes = [
  {
    path: '/',
    component: PostIndex,
  },
  {
    path: '/posts',
    component: PostIndex
  }
];

const router = createRouter({
  // 브라우저의 접속페이지 히스토리 기능
  // 브라우저의 뒤로가기 기능을 위한 코드
  history: createWebHistory(),
  routes,
});

export default router;
