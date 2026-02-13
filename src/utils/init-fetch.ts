import { BASE_URL } from "./Constants/apis";
import { authKeys } from "./Constants/auth";

export async function initFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const isServer = typeof window === "undefined";
  const headers = new Headers(options.headers);

  // body가 존재하고, formdata(image,file 등록)가 아니면 content-type 강제 설정
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // 서버일 때만 수동으로 토큰 주입 (미들웨어가 이미 구워준 쿠키를 활용)
  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const at = cookieStore.get(authKeys.ACCESS_TOKEN)?.value;
    if (at) headers.set("Authorization", `Bearer ${at}`);
  }

  // fetch 실행
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include", // 브라우저가 쿠키를 알아서 실어 보냄
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `에러 발생: ${response.status}`);
  }

  return data as T;
}
