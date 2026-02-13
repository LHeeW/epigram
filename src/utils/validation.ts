// 이메일 검증
export const validationEmail = (email: string) => {
  if (!email) return "이메일은 필수 입력입니다.";
  if (!/\S+@\S+\.\S+/.test(email)) return "이메일 형식으로 작성해주세요.";
  return "";
};

// 비밀번호 검증
export const validationPassword = (password: string) => {
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  if (!password) return "비밀번호는 필수 입력입니다.";
  if (password.length < 8) return "비밀번호는 최소 8자 이상입니다.";
  if (!passwordRegex.test(password))
    return "비밀번호는 숫자,영문,특수문자로만 가능합니다";
  return "";
};

// 비밀번호 확인 검증
export const validationPasswordConfirm = (
  password: string,
  passwordConfirmation: string,
) => {
  if (!passwordConfirmation) return "비밀번호 확인을 입력해주세요.";
  if (password !== passwordConfirmation) return "비밀번호가 일치하지 않습니다.";
  return "";
};

// 닉네임 검증
export const validationNickname = (nickname: string) => {
  if (!nickname) return "닉네임은 필수 입력입니다.";
  if (nickname.length > 20) return "닉네임은 최대 20자까지 가능합니다.";
  return "";
};
