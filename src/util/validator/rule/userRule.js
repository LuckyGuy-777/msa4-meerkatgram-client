// 이메일 유효성 체크
/**
 * 
 * @param {string} val 검증할 문자열 
 * @returns {string} 통과시 빈 문자열(''), 실패시 에러메세지
 */

export const email = (val) => {
  const regex = /^[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}@[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}\.[a-zA-Z]{2,3}$/;

  // 이메일 값이 있는지 없는지 검증
  if(!val) {
    return '이메일은 필수 입니다';
  }

  //정규식 체크
  if(!regex.test(val)) {
    return '이메일 양식이 올바르지 않습니다.'
  }

  // 정상일 경우
  return '';
}

// 패스워드
export const password = (val) => {
  const regex = /^[0-9a-zA-Z!@#$%^&*()]{8,20}$/;

  // 패스워드 값이 있는지 없는지 검증
  if(!val) {
    return '비밀번호는 필수 입니다';
  }

  //정규식 체크
  if(!regex.test(val)) {
    return '비밀번호 양식이 올바르지 않습니다.\n영어 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *) 허용';
  }

  // 정상일 경우
  return '';
}

// 비밀번호 확인 체크
export const passwordChk = (password, passwordChk) => {
  
  // 비밀번호 확인란이 비어있을 경우
  if(!passwordChk) {
    return '비밀번호 확인은 필수 입니다.'
  }

  // 비밀번호와, 비밀번호 확인이 같으면, 빈문자열, 그렇지않다면, 안내문구 리턴
  return password === passwordChk ?  '' : '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
}


// 닉네임 체크
export const nick = (val) => {
  // 정규식
  const regex = /^[0-9a-zA-Z_]{2,20}$/;

  // 닉네임이 입력 안됬을 경우
  if(!val) {
    return '닉네임은 필수 입니다.'
  }

  // 닉네임이 정규식에 맞지 않을때
  if(!regex.test(val)){
    return '닉네임 양식이 올바르지 않습니다.\n영어 대소문자, 숫자, 특수문자(_) 허용'
  }

  // 이상이 없으면 빈문자열
  return '';

}

// 프로필 체크
export const profile = (val) => {
  
  // 프로필이 없을 경우
  if(!val) {
    return '프로필은 필수 입니다.';
  }

  // 정상일 경우 빈 문자열
  return '';
}

export const img = (val) => {

  if(!val) {
    return '이미지는 필수 입니다.';
  }

  return '';
}

export const content_input = (val) => {
  if(!val) {
    return '내용입력이 필요합니다..';
  }

  return '';
}




// 각 항목들 마다 어떤걸 체크해서 어떤걸 반환하는가 를 체크
// regex.. /^~~~$/ 

// regex.test(val)) : regex의 양식에 맞는지 val을 체크
// 통과되지 않는다면, return
