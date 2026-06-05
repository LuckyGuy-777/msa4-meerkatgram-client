<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { usePostIndexStore } from '../../store/post/usePostIndexStroe.js';
import { useRouter } from 'vue-router';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';

const router = useRouter();
const postIndexStore = usePostIndexStore();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}


const getNextPage = async () => {

  await getPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

//라이프 사이클
onBeforeMount(getPagination);
onBeforeMount(postIndexStore.clearPostIndex);

</script>

<template>
<div class="card-container">
  <!-- testList 이미지 들을, v-for 반복문으로 출력 -->
  <div
    class="card"
    v-for="item in postIndexStore.items"
    :key="item.id"
    :style="{backgroundImage: `url(${item.image})`}"
    @click="redirectShow(item.id)"
   ></div>
</div>
<MyButton
  v-if="!postIndexStore.isLastPage"
  :color="'gray'"
  :size="'big'"
  :content="'Show more posts Yoonseok'"
  @click="getNextPage()" 
/>
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px , 1fr));
}
.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>




// ------------------스토어로 이관 start---------------------------
//  
// const posts = ref([]);
// const isLastPage = ref(false);  // 마지막 페이지 일때.
// let currentPage = 0;

// 함수선언식 -> ! 중복된 이름을 사용하면, 기존것을 덮어쓴다.
// 함수표현식 -> ! 호이스팅이 불가함.




// // 함수 정의. 익명함수를 사용함. 선언부 보다 위에서 사용하면 에러
// // 비동기처리(서버와 통신하는 함수) 는, store 쪽에 있어야함.
// // 나중에 pinia 로 분리 시킨다고 한다.
// // page에 값이 전달 되지 않으면, page는, 1로 자동설정됨.
// const getPostPagination= async (page = 1) => {
//   // 마지막 페이지가 아닐경우만 실행
//   if(!isLastPage.value) {

//     try {

//       const url = '/api/posts';
//       const params = {  // { } 하면, 객체형태로.
//         page,
//       };
  
//       // 내가 하고자 하는 비동기처리에 await()
//       // 비동기 처리 함수들은, store 로 관리를 한다 (피니아)
//       const res = await myAxios.get(url, {params});
//       const data = res.data.data; // .data.data 를 해야, 백엔드에서 json 형태로 보낸 data부분에 접근할 수 있다.
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);
  
      
//       console.log(res.data) // 우리가 가져와야 하는 데이터

//       currentPage++;
//     }
//     catch (error) {
//       console.error(error);
//     }
//   }
    
// }

// ------------------스토어로 이관 end---------------------------


// ...data.posts:   ... 을 하면, 기존에 있던 데이터를 꺼내서(구조분해)
// 저장함 
// 어떤 문제가 생기면, 스토어 부분을 보면된다고함

// 단순히 호출을 해주는 코드들.
