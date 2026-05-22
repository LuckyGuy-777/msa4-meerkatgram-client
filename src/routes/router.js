import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";

// 페이지 주소관련 코드
// /posts로 접속했을 때, /로 접속했을때, /errors로 접속했을때
const routes = [
  {
    //   / 으로 접속했을때, /posts 로 리다이렉트 됨.
    path: '/',
    redirect: '/posts'
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex
  },
];

const router = createRouter({
  // 브라우저의 접속페이지 히스토리 기능
  // 브라우저의 뒤로가기 기능을 위한 코드
  history: createWebHistory(),
  routes,
});

export default router;
