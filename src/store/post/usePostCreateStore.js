import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios.js";
import { useMyErrorStore } from "../error/useMyErrorStore.js";


// store (피니아) : 는 중앙 집중형 관리 이다.

export const usePostIndexStore = defineStore('postCreate', () => {
  // 1. state (ref)
  // 다른 페이지에 갔다가 와도, 이전페이지 정보를, 유지시켜줄 수 있음

  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2. getter (computed) :
  // computed 는, 연산한 결과를 미리 메모리에 올려둬서, 좀더 빨리 결과를 가져올 수 있다.
  const getNextPageNumber = computed(() => currentPage.value +1);



  // 3. Actions (function)
  // 함수 정의. 익명함수를 사용함. 선언부 보다 위에서 사용하면 에러
  // 비동기처리(서버와 통신하는 함수) 는, store 쪽에 있어야함.
  // 나중에 pinia 로 분리 시킨다고 한다.
  // page에 값이 전달 되지 않으면, page는, 1로 자동설정됨.

  const clearPostIndex = () => {
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }


  const getPostPagination= async (page = 1) => {
    // 마지막 페이지가 아닐경우만 실행
    if(!isLastPage.value) {
      try {
        // try 에서 에러가 발생하면, 상위객체에 에러가 발생된걸 알림
          const url = '/api/posts';
          const params = {  // { } 하면, 객체형태로.
            page,
          };
      
          // 내가 하고자 하는 비동기처리에 await()
          // 비동기 처리 함수들은, store 로 관리를 한다 (피니아)
          const res = await myAxios.get(url, {params});
          const data = res.data.data; // .data.data 를 해야, 백엔드에서 json 형태로 보낸 data부분에 접근할 수 있다.
          isLastPage.value = data.lastPage;
          items.value.push(...data.posts);
      
          
          console.log(res.data) // 우리가 가져와야 하는 데이터
  
          currentPage.value++;  // ref 형태로 있는건 value 로 접근해야한다고함
        
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }


        //   catch 안에, throw 만 있다면, catch 문은 없어도됨
      // catch (error) {
      //   throw error;
      // }

  return {
    // state
    items,
    isLastPage,

    // getters
    getNextPageNumber,

    // actions
    clearPostIndex,
    getPostPagination,
  }

});


/**
 * 
 * 
 * 
// store (피니아) : 는 중앙 집중형 관리 이다.
// 누가 잘못 조작을 하고 있는지 잘 모르니 한 곳에 모아서 관리하자 라는 의미

// 관습적으로 네이밍 전략 : use+기능명+스토어 -> 이것은 스토어 구나 인식을 한다고함
// 인수는, 1, 내부적으로 사용할 이름, 2. 콜백함수. 마지막에 내가만든 함수를 리턴해줘야함
 * 
 * 
 * 
 *   const clearPostIndex = () => {
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  } 
    state 초기값으로 세팅하는 함수
 *   


    
  return {
    // state
    items,
    isLastPage,

    // getters
    getNextPageNumber,

    // actions
    clearPostIndex,
    getPostPagination,
  }

  피니아는, 리턴으로, 위 처럼 프로퍼티 들이나, 콜백들을
  리턴해줘야함

 */  
