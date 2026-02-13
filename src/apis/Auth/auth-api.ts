import { initFetch } from "@/utils/init-fetch";
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./auth-api-types";

// 회원가입
export async function postSignUp(data: SignUpRequest) {
  return await initFetch<SignUpResponse>("/auth/signUp", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 로그인
export async function postSignIn(data: SignInRequest) {
  return await initFetch<SignInResponse>("/auth/signIn", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 접근 토큰 재생성
export async function postRefreshToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  return await initFetch<{ accessToken: string }>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify(refreshToken),
  });
}
