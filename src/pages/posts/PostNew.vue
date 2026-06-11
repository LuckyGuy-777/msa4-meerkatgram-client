<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import axios from 'axios';
import { img,content_input } from '../../util/validator/rule/userRule.js';

const content_input = ref('');

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null); // 파일 경로가 담김("문자열")
const selectedFile = ref(null); // 유저가 올린 "파일객체" 가 저장되는 상태변수

const registrationData = reactive({
  img,
  content_input
})



const inputPhoto = async (e) => {
  const file = e.target.files[0];  //  선택한 파일의 0번째를 대상으로 한다.

     

</script>

<template>
  
<div class="container">
  <div class="content">
    <textarea 
    id="content_input"
    placeholder="내용 입력"
    v-model="content_input"
    ></textarea>
  </div>

  <input
   id="file_input"
   type="file" 
   accept="image/*"
   @change="inputPhoto" 
  >
  <img
  id="previewPhoto"
   v-if="preview"
   :src="preview"
  >
</div>

<MyButton
  :color="'gray'"
  :size="'middle'"
  :content="'Write'"
  @click="submitPost()"
/>

</template>

<style scoped>

#content_input {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 500px;
  height: 300px;
}

#file_input {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

#previewPhoto {
  width: 70px;
  height: 70px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
