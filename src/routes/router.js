import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import { isAllWhitespace } from "@vue/compiler-core";


// 이동할 페이지가 인증이 필요한지 아닌지
// 인증없이 쓸수 있는지 매개변수로 주입.
const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated,
    isGuestOnly,
  }
}


// 페이지 주소관련 코드
// /posts로 접속했을 때, /로 접속했을때, /errors로 접속했을때
const routes = [
  {
    //   / 으로 접속했을때, /posts 로 리다이렉트 됨.
    path: '/',
    redirect: '/posts',
    meta : setMeta(false, false)
  },

  // 인증관련
  {
    path: '/login',
    component : Login,
    meta : setMeta(false,true)
  },


  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false)
  },
];

const router = createRouter({
  // 브라우저의 접속페이지 히스토리 기능
  // 브라우저의 뒤로가기 기능을 위한 코드
  history: createWebHistory(),
  routes,
});


// 네비게이션 가드
// 라우터로 페이지를 이동하는데, 이동하는 특정시점에서 로직을 실행시키고 싶을때.
router.beforeEach(async (to, from, next) => {
  // authStore
  const authStore = useAuthStore();

  // accessToken(인증) 이 없을때, 토큰 재발급 시도
  if(!authStore.isLoggedIn){
    try {
      await authStore.reissue();
    } catch (error) {
      // alert('로그인 기간이 만료되었습니다.\n 다시 로그인 해 주십시오.');
      // return next('/login');
    }
  }


  // 인증이 필요한 페이지 인데, 로그인이 안된경우 로그인페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn ){
    return next('/login');
  }

  // 게스트만 접근가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동시킴
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/');
  }


  // 나머지는 통과
  next();
});



export default router;

/**
 *
 * {
    path: '/login',
    component: Login,
  },
  
  은, /login 페이지로 이동하면, login 버튼이 나옴
 * 



beforeEach(); 는, 라우터 위의 path 들을 루프돌리는것.
파라미터는, to, from, next

router 은, 선언되 있던, router 콜백을 의미함

to : 내가 이동할 라우트 정보

from : 이동하기 전 라우트정보

다음 처리로 진행하게 해줄수 있는 함수
next : 다음라우터로 이동하게 해줄수 있는 함수
 */
