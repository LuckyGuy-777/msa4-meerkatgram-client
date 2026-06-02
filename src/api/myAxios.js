import axios from "axios";
import { useAuthStore } from "../store/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// axios 생성
const myAxios = axios.create({

  // Axios 호출시, url 가장 앞에 자동으로 연결해서 동작함.
  baseURL: import.meta.env.VITE_API_BASE_URL,


  headers: {
    'Content-Type': 'application/json',
  },



 // 크로스 도메인 에 요청을 보낼때,
 // credential 정보를 담아서 보낼지 여부를 설정
 // credential 정보 : cookies, header Authorization 항목 등..
  withCredentials: true,
});

myAxios.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  let accessToken = authStore.accessToken;
  const denyUrl = /^\/api\/reissue-token$/;

  
  if(!denyUrl.test(config.url) && authStore.isLoggedIn){
    // 엑세스 토큰 만료 확인
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix();
    const expTime = dayjs.unix(claims.exp).add(-5, "minute").unix()

    if(now >= expTime) {
      try {
        await authStore.reissue();
        accessToken = authStore.accessToken;
      } catch (error) {
        console.error(error?.response);
      }
    }
  }

  if(accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;

});

// myAxios 를 사용해야함
export default myAxios;



//  'Content-Type': 'applicaton/json', 기본적으로 리퀘스트바디에 담겨온 타입이, json 데이터




// 크로스 도메인 : 서로 다른 도메인사이트 를 의미함
// http://localhost:5173/ 과, http://localhost:8080 은 서로 다르다.


// myAxios.interceptors.request.use(); 는,



// 기본적으로 크로스 도메인 끼리는, 데이터를 주고받을 수 없다.
// 안전하지 않다는 이유로, 웹에서 차단하기 때문이다.


//    reissue 토큰을 재발급 받을때는, 인터셉트를 통해서 다시 재발급받는
//    과정을 가져버리면, 무한루프가 되버리니, 인터셉트과정을 통과
//    (리트라이 제외 url 설정)
//    const denyUrl = /^\/api\/reissue-token$/;


// if(!config.url.test(denyUrl) && authStore.isLoggedIn)
// 로그인이 되어있거나, denyUrl 이 아닌경우에..

// const now = dayjs().unix(); 현재시간의 유닉스타임스탬프

// dayjs.unix(claims.exp).add(-5, "minute").unix()
// 해당 클레임으로 현재시간을 가져오고, 그 시간을 -5분 하고, 
// 그 시간을 유닉스 타임스탬프로 가져옴
