import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore('myErrorStore', () => {
  // 1. State (ref)
  const isError = ref(false);
  const errorCode = ref('');
  const errorMsg = ref('');

  // 2. Getter (computed)


  // 3. Actions (function)
  const setErrorInfo = (error) => {
    const errorData = error.response?.data || {code: 'UNKNOWN_ERROR', message: '예기치 못한 에러가 발생 했습니다'};
    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  }

  // 에러 초기화 메서드
  const clearErrorInfo = () => {
    // 에러 값과 메세지, 플래그를 초기화
    errorCode.value = '';
    errorMsg.value = '';
    isError.value = false;
  }

  // 우리가 만들었던 액션들을 리턴해주면, store 완성
  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
  }

})


// error.response.data 로 접근하면, 백엔드에서,
// 보내는 에러를 확인할 수 있다.

// 그러나 프론트에서 반환되는 에러는, res 프로퍼티가
//  없다고한다.

// error.response?.data : 에러에, response안에, data가 있느냐 라고
// 묻는것. 이처럼 ?. 을 넣는건, '옵셔널 체이닝' 이라고함
// 에러객체에 response가 있다면, data를 반환, 없다면 undefined 반환
