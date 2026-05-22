<script setup>
import { useRouter } from 'vue-router';
import MyButton from '../../components/button/MyButton.vue';
import { useMyErrorStore } from '../../store/error/useMyErrorStroe';


const router = useRouter();
const myErrorStore = useMyErrorStore();


// 메인페이지로 이동하기 위함
const redirectMain = () => {
  myErrorStore.clearErrorInfo();
  // URL을 히스토리 스택에 추가하지 않고 이동하는 메서드
  // replace에 이동할 경로를 주면됨
  router.replace('/');
}
</script>

<template>
<h1>에러 발생</h1>
<h2>에러 코드 : {{ myErrorStore.errorCode }}</h2>
<h2>에러 내용 : {{ myErrorStore.errorMsg }}</h2>
<h2>아래 버튼을 누르면, 메인페이지로 이동 합니다.</h2>

<MyButton
  :size="'middle'"
  :color="'gray'"
  :content="'메인페이지로'"
  @click="redirectMain()"
></MyButton>
</template>

<style scoped>

</style>
