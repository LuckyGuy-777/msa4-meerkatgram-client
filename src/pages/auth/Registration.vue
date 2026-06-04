<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';


const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();

const preview = ref(null); // 파일 경로가 담김("문자열")
const selectedFile = ref(null); // 유저가 올린 "파일객체" 가 저장되는 상태변수
const registrationData = reactive({
  email: '',
  password: '',
  passwordChk: '',
  nick : '',
  profile : '',
})



const handleSubmit = async () => {

  try {
      await authStore.registration(registrationData);
      alert("회원가입에 성공했습니다")
      router.replace('/login');
  
  } catch (error) {
      console.error(error);
    const data = error.response.data.data;
    if(data.code === 'E11'){
      alert(data.data);
    }else if(data.code ==='E21') {
      alert('잘못된 양식입니다');
    }else {
      alert("오류가 발생했습니다\n잠시후 다시 시도해주세요.");
      router.replace('/')
    } 
  }

}

const handleChangeProfile = async (e) => {
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

</script>

<template>
<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model = "registrationData.email"
  ></MyInput>

  <MyInput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    v-model = "registrationData.password"
  ></MyInput>

    <MyInput
    :type="'password'"
    :placeholder="'PasswordChk'"
    :readonly="false"
    :required="true"
    v-model = "registrationData.passwordChk"
  ></MyInput>


  <MyInput
    :type="'text'"
    :placeholder="'Nick'"
    :readonly="false"
    :required="true"
    v-model = "registrationData.nick"
  ></MyInput>

  <!-- preview 변수가 바뀌면, 백그라운드 이미지를 바꾼다 -->
   <!-- 프리뷰 에는 파일경로가(유저가 올린 사진) 저장됨 -->
  <div
     class="preview"
     v-if="preview"  
     :style="{backgroundImage: `url(${preview})`}"
  ></div>

  <input
   type="file" 
   accept="image/*"
   @change="handleChangeProfile" 
  >

  <MyButton
    :btn-type = "'submit'"
    :color = "'black'"
    :size="'middle'"
    :content="'Sign Up'"
  ></MyButton>
</form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}

</style>


<!--  
<form @submit.prevent="">
기존에 존재하던 submit 이벤트를 내가 입력한 콜백으로 대체한다

  <MyButton
    :btn-type = "'submit'"
    :color = "'gray'"
    :size="'middle'"
    :content="'Log In'"
  ></MyButton>

  버튼 관련 스타일



  

  const loginform = reactive({
  email: '',
  password: '',
})
이메일과 패스워드를 받는, 반응형 변수


<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model="loginform.email"
  ></MyInput>

  v-model="loginform.email" 은
  loginform의 email과 이어주는것


await authStore.login(loginform);  로그인할때, 로그인 폼을 줌

  
  <MyInput
    :type="'password'"
    :placeholder="'Password'" 인풋에 기본 입력될 문구
    :readonly="false"
    :required="true"
    v-model="loginform.password"
  ></MyInput>

  v-model="loginform.password" 은
  loginform의 password과 이어주는것


    <MyStrikeThroughBehindWord
    :content="'or'"
  ></MyStrikeThroughBehindWord>

  인풋 박스와, 로그인 버튼 사이의 or 부분

-->
