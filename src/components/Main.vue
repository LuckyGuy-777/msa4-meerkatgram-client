<script setup>
import MyError from '../pages/errors/MyError.vue';
import { useMyErrorStore } from '../store/error/useMyErrorStore';


// useMyErrorStore(); 에서, isError를, err라는 이름으로 구조분해
const myErrorStore = useMyErrorStore();
</script>

<template>
  <MyError v-if="myErrorStore.isError"></MyError>
  <router-view v-else></router-view>
</template>


<!-- 특정상황에선 에러페이지 -->
