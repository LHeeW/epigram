import type { components } from "@/types/types";

// 회원가입
export type SignUpRequest = components["schemas"]["SignUpRequestBody"];
export type SignUpResponse = components["schemas"]["SignUpResponse"];

// 로그인
export type SignInRequest = components["schemas"]["SignInRequestBody"];
export type SignInResponse = components["schemas"]["SignInResponse"];
