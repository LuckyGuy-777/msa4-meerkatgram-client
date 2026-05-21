import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 개발 서버 Proxy 정의
  server : {
    proxy: {
      // 요청 가는 경로. /api 로 시작하면 .. 해주겠다 
      // api 로 시작하는 것들은, 중괄호 안에 있는 것들을 실행하겠다.
      '/api': {
        target: '  http://localhost:8080', // Request 대상 서버 도메인
        changeOrigin: true, // Request Header Host 필드값을, 대상서버 호스트로 변경
        secure: false, // SSL 인증서 검증 무시

        // ws: // 웹 소켓사용을 사용할건지 여부 (실시간 채팅 기능)
      }
    }
  }
})

//  Proxy
/**
 * 클라이언트 부분에서, localhost:5173 번으로  벡엔드에 전송하면,
 * 웹에서, 보안상의 안전을 이유로 거절한다.
 * 그래서, 백엔드에 데이터를 전송할때, 프록시가, 클라이언트의 주소를
 *  백엔드의 주소로 변환시켜서 백엔드에 요청을 보낸다.
 * 
 * 백엔드에서 클라이언트로 다시 정보를 전송할떄,
 * 프록시는, 백엔드의 주소를, 클라이언트로 바꿔서 전달한다.
 * 
 * ! 주의점은, 개발 할때만 작동한다. 운영할때는 작동안됨
 * 
 */
