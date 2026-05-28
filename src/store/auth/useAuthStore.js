import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore"; 


export const useAuthStore = defineStore('authStore', () => {


  // 1. State
  const isLoggedIn = ref(false)
  const accessToken = ref('');
  const userInfo = ref(null);

  // 2. Getter


  // 3. Actions
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

  const login = async (loginForm) => {
    try {
      const url = '/api/login'; 

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;

    } catch (error) {
      console.error(error);
      if(error.response){
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      
      useMyErrorStore().setErrorInfo(error);
    }
  }

  // 리턴을 해줘야, 피니아의 값들을 다른 클래스에서 쓸 수 있다.
  // state, 게터, 액션 전부 각각 리턴할 수 있다.

  return {
    // state
    isLoggedIn,
    accessToken,
    userInfo,

    // getter


    // action
    login,
  }

})



/**
 * defineStore 을 이용해서, 피니아 임포트와 생성
 * 
 *
 * const isLoggedIn = ref(false)  로그인 여부 상태값
   const accessToken = ref('');   액세스토큰 상태값
   const userInfo = ref(null);   유저정보 상태값


   clearAuthStore 은, 로그인정보가 필요없어졌을때, 초기화 해주는 콜백


   login 로그인과정에 대한 설정
   const url = '/api/login';  로그인 페이지 경로

      const data = res.data.data;  응답받은 데이터가 담김
      accessToken.value = data.accessToken;  응답받은 액세스토큰이 담김
      userInfo.value = data.userInfo;  응답받은 유저정보가 담김
      isLoggedIn.value = true  로그인여부가 바뀜



      catch (error) {
      if(error.response?.data){
        if(error.response.data.data.code === 'E01') {
          alert(error.response.data.data.message);
          return;
        }
      }
      
    }
  }

})      백엔드와 통신관련 코드.
        E01 에러가 났을때에 대한 처리

 */
