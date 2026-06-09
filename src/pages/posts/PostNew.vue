<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import axios from 'axios';

const content_input = ref('');

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null); // 파일 경로가 담김("문자열")
const selectedFile = ref(null); // 유저가 올린 "파일객체" 가 저장되는 상태변수

const registrationData = reactive({
  email: '',
  password: '',
  passwordChk: '',
  nick : '',
  profile : '',
})



const inputPhoto = async (e) => {
  const file = e.target.files[0];  //  선택한 파일의 0번째를 대상으로 한다.


  if(file) {
    if(preview.value) {
      // 기존에 생성된 메모리 url이 있다면 해제(메모리누수 방지)
      URL.revokeObjectURL(preview.value)
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadProfile(file);


    if(fileUri) {
      registrationData.profile = fileUri;
  
      selectedFile.value = file; // 유저가 올린 파일객체 자체가 저장됨
  
      // 파일 객체를 부라우저에서 접근 가능한 임시URL로 변환
      preview.value = URL.createObjectURL(file);

      
    }
  }
}

const submitPost = async () => {
  // 1. 유효성 검사 (글 내용이 비어있는지 확인)
  if (!content_input.value) {
    alert('내용을 입력해주세요.');
    return;
  }

  // 2. 백엔드로 보낼 데이터 조립 (JSON 형식)
  const postData = {
    content: content_input.value,

    // 앞서 fileStore.uploadProfile(file)을 호출하고 응답받아 저장해둔 이미지 URL
    imageUrl: registrationData.profile // (또는 URL을 저장해둔 변수명)
  };

  try {
    // 3. Axios로 게시글 작성 API에 POST 요청
    const response = await axios.post('/api/newpost', postData, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${authStore.token}` // JWT 토큰 필요 시 추가
      }
    });

    alert('게시글이 성공적으로 등록되었습니다!');
    // 성공 후 피드 목록이나 상세 화면으로 이동
    // router.push('/board');

  } catch (error) {
    console.error('작성 실패:', error);
    alert('등록 중 예외가 발생했습니다.');
  }


}


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
