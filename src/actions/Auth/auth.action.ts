"use server";

import { authKeyword } from "@/utils/Constants/auth";
import { cookies } from "next/headers";
import initFetch from "../init-fetch";
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./auth";

// 회원가입
export async function postSignUp(data: SignUpRequest) {
  return await initFetch<SignUpResponse>("/auth/signUp", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 로그인
export async function postSignIn(data: SignInRequest) {
  const res = await initFetch<SignInResponse>("/auth/signIn", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.accessToken && res.refreshToken) {
    const cookiesStore = await cookies();

    cookiesStore.set(authKeyword.ACCESS_TOKEN, res.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    cookiesStore.set(authKeyword.REFRESH_TOKEN, res.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}

// 접근 토큰 재생성
export async function postRefreshToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  return await initFetch<{
    accessToken: string;
  }>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify(refreshToken),
  });
}
