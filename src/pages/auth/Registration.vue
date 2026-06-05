<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';
import registrationValidator from '../../util/validator/domain/auth/registrationValidator.js';
import { password } from '../../util/validator/rule/userRule.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';


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



const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
    registrationValidator.email(registrationData.email),
    registrationValidator.password(registrationData.password),
    registrationValidator.passwordChk(registrationData.password,registrationData.passwordChk),
    registrationValidator.nick(registrationData.nick),
    registrationValidator.profile(registrationData.profile),
  ];

  // val의 값이 비어있지 않은값만 리턴
  // join('원하는 구분자') 은, 특정 구분자를 기준으로 문장을 합쳐 준다
  
  // 유효성 검사에서 걸린 요소들을 값으로 가짐
  const errorList = validationList.filter(val => val);

  // 유효성 검사들을 반복문으로 alert 창으로 띄움
  if(errorList.length > 0){
    alert(errorList.join('\n'))

    //유효성 검사에서 걸리면, if 문 다음 처리가 진행되지 않도록, return 처리
    return;
  }

  try {
    await authStore.registration(registrationData);
    alert("회원가입에 성공했습니다")
    router.replace('/login');
  } catch (error) {
    const data = error.response.data;
    if(data.code === 'E11'){
      alert(data.data);
    }else if(data.code ==='E21') {
      alert('잘못된 양식입니다');
    }else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error')
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


<!--  filter 메소드 : 조건에 맞는것만 가져오는것. -->
