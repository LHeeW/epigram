import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./utils/Constants/apis";
import { authKeys } from "./utils/Constants/auth";

// 인증이 필요한 보호된 라우트 목록
const protectedRoutes = [
  "/addepigram",
  "/epigrams",
  "/feed",
  "/search",
  "/mypage",
];

// 인증이 없는 상태에서는 접근가능한 라우트 목록
const authRoutes = ["/login", "/signin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const at = request.cookies.get(authKeys.ACCESS_TOKEN)?.value;
  const rt = request.cookies.get(authKeys.REFRESHTOKEN)?.value;

  let response = NextResponse.next();

  if (!at && rt) {
    try {
      const rtRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: rt }),
        credentials: "include",
      });

      if (rtRes.ok) {
        const data = await rtRes.json();

        response.cookies.set(authKeys.ACCESS_TOKEN, data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });
      } else {
        response.cookies.delete(authKeys.ACCESS_TOKEN);
        response.cookies.delete(authKeys.REFRESHTOKEN);
      }
    } catch (e) {
      console.error("Middleware refresh error", e);
    }
  }

  if (pathname.startsWith("/api/")) {
    const currentAT = response.cookies.get(authKeys.ACCESS_TOKEN)?.value || at;
    const requestHeaders = new Headers(request.headers);

    if (currentAT) {
      requestHeaders.set("Authorization", `Bearer ${currentAT}`);
    }

    const apiResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // 재발급된 토큰이 response에 존재한다면 브라우저에도 전달될 수 있게 apiResponse에 동기화
    const newAT = response.cookies.get(authKeys.ACCESS_TOKEN);
    if (newAT) {
      apiResponse.cookies.set(authKeys.ACCESS_TOKEN, newAT.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });
    }

    return apiResponse;
  }

  const isProtectRoutes = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectRoutes) {
    const currentAT = response.cookies.get(authKeys.ACCESS_TOKEN)?.value || at;
    const currentRT = rt;

    if (!currentAT && !currentRT) {
      const loginPage = new URL("/login", request.url);

      return NextResponse.redirect(loginPage);
    }
  }

  if (authRoutes.includes(pathname)) {
    if (rt) {
      const rootPage = new URL("/", request.url);

      return NextResponse.redirect(rootPage);
    }
  }

  return response;
}

/*
 * 아래로 시작하는 경로를 제외한 모든 요청에 미들웨어 적용:
 * - _next/static (정적 파일)
 * - _next/image (이미지 최적화 파일)
 * - favicon.ico (파비콘)
 * - public 폴더 안의 이미지 등
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
