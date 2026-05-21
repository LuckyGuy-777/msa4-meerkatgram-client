import axios from "axios";

// axios 생성
const myAxios = axios.create({

  // Axios 호출시, url 가장 앞에 자동으로 연결해서 동작함.
  baseURL: import.meta.env.VITE_API_BASE_URL,

 // 크로스 도메인 에 요청을 보낼때,
 // credential 정보를 담아서 보낼지 여부를 설정
 // credential 정보 : cookies, header Authorization 항목 등..
  withCredentials: true,
});


// 크로스 도메인 : 서로 다른 도메인사이트 를 의미함
// http://localhost:5173/ 과, http://localhost:8080 은 서로 다르다.



// 기본적으로 크로스 도메인 끼리는, 데이터를 주고받을 수 없다.
// 안전하지 않다는 이유로, 웹에서 차단하기 때문이다.



// myAxios 를 사용해야함
export default myAxios;
