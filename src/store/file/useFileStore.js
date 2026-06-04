import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";


export const useFileStore = defineStore('fileStore', () => {

  // state


  // Getters


  // Actions
  const uploadProfile = async (file) => {

    try{
      const url = '/api/files/profiles';

      // Form Data 생성
      const data = new FormData();
      data.append('file',file);

      // Content-type 변경
      const config = {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }

      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;

    } catch (error){
      console.error(error);
      return null;
    }
  }

  return {
    uploadProfile,
  }
});



// useFileStore
// 뷰나 리액트 앵귤러 같은, 템플릿 없이 순수하게 자바스크립트 파일로 작동하는 파일이 있다
// 그 파일은, 상태변화되는 값만 저장되거나, 그것을 조작하는 것인데, 그걸 hooks라고 한다
// 관습상 사용명+파일명+store 으로 이름을 짓는다
// use 는 보통 hooks 이다

// defineStore('기능명', 콜백) 

// data.append('전송할 이름',데이터);
// new FormData();는 폼데이터를 가져오는 객체
