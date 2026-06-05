<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';


const router = useRouter();
const authStore = useAuthStore();

// useAuthStore(); 자동완성 안됨

// Sign in, Sign Up 버튼 누르면,
// 해당페이지로 이동하는 기능

const redirectMain = () => {
  router.push('/')
}

const redirectLogin= () => {
  router.push('/login')
}


const logout = async () => {
  await authStore.logout();
  router.replace('/');
}

const redirectRegistration = () => {
  router.push('/registration');
}

</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
       v-if="!authStore.isLoggedIn"
       @click="redirectLogin()" 
       :content="'Sign In'"
       :color="'gray'"
       :size="'small'"
       />
      <MyButton
       v-if="!authStore.isLoggedIn"
       @click="redirectRegistration()"
       :content="'Sign Up'"
       :color="'white'"
       :size="'small'"
       />


      <MyButton
       v-if="authStore.isLoggedIn"
       :content="'Logout'"
       :color="'black'"
       :size="'small'"
       @click="logout()"
       />
    </div>
  </div>
  <hr>
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.title{
  font-size: 20px;
}

.title-box{
  display: flex;
  align-items: center;
}

.btn-box {
  display: flex;
  gap: 10px;
  
}
</style>


<!-- 

const router = useRouter(); 페이지를 두페이지를 넘기니 뭐니
페이지를 이동하는데 쓰는듯 함.


router.replace : 이전페이지 이력을 남기고 싶지 않을때. (뒤로가기 x)


router.push : 이전페이지 이력을 남기고 싶을때. (뒤로가기 o)

router.push('/login') : 로그인 페이지로 이동하고 이전페이지 이력남기는것

router.push('/') : 메인이로 이동하고, 이전페이지 이력남기기


# 빌드할때 내장서버가 꼬일 수 있어서, 작게 수정한 경우에는 동작 안할 수도 있다.
그럴 경우, 서버를 재 가동시켜야함



-->
