// 이메일
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
    return '비밀번호 양식이 올바르지 않습니다.'
  }

  // 정상일 경우
  return '';
}





// 각 항목들 마다 어떤걸 체크해서 어떤걸 반환하는가 를 체크
// regex.. /^~~~$/ 

// regex.test(val)) : regex의 양식에 맞는지 val을 체크
// 통과되지 않는다면, return
