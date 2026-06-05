<script setup>
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindWord from '../../components/decoration/MyStrikeThroughBehindWord.vue';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import { useRouter } from 'vue-router';
import loginValidator from '../../util/validator/domain/auth/loginValidator.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';



const router = useRouter();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();
const loginform = reactive({
  email: '',
  password: '',
})


const handleSubmit = async() => {
  // 유효성 검사
  const resultValidationEmail = loginValidator.email(loginform.email);
  const resultValidationPassword = loginValidator.password(loginform.password);

  // 이메일, 패스워드 유효성검사가 정상일때 (빈문자열)
  if(!resultValidationEmail && !resultValidationPassword) {
    // 유효성검사 통과 패턴
    try {
      await authStore.login(loginform);
      router.replace('/posts')      
    } catch (error) {

      if(error.response){
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      myErrorStore.setErrorInfo(error);
      router.replace('/error')
    }

  }else{
    // 유효성 검사 실패패턴
    alert(`${resultValidationEmail}\n${resultValidationPassword}`);
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
    v-model="loginform.email"
  ></MyInput>

    <MyInput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    v-model="loginform.password"
  ></MyInput>

  <MyButton
    :btn-type = "'submit'"
    :color = "'gray'"
    :size="'middle'"
    :content="'Log in'"
  ></MyButton>

  <MyStrikeThroughBehindWord
    :content="'or'"
  ></MyStrikeThroughBehindWord>

  <MyButton
    :btn-type = "'button'"
    :color = "'white'"
    :size="'middle'"
    :content="'Sign UP'"
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
