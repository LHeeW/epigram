import { BASE_URL } from "@/utils/Constants/apis";
import { authKeyword } from "@/utils/Constants/auth";
import { cookies } from "next/headers";

export default async function initFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(authKeyword.ACCESS_TOKEN)?.value;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (options.body) {
    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
  }

  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = cookieStore.get(authKeyword.REFRESH_TOKEN)?.value;

    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();

        cookieStore.set(authKeyword.ACCESS_TOKEN, data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 60 * 60,
        });

        headers.set("Authorization", `Bearer ${data.accessToken}`);
        response = await fetch(`${BASE_URL}${url}`, { ...options, headers });
      } else {
        cookieStore.delete(authKeyword.ACCESS_TOKEN);
        cookieStore.delete(authKeyword.REFRESH_TOKEN);
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API 요청 실패");
  }

  return response.json();
}
