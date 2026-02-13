"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { postSignIn } from "@/apis/Auth/auth-api";
import type { SignInRequest } from "@/apis/Auth/auth-api-types";
import { authKeys } from "@/utils/Constants/auth";

export async function SiginAction(data: SignInRequest) {
  const response = await postSignIn(data);

  if (response.accessToken && response.refreshToken) {
    const cookieStore = await cookies();

    cookieStore.set(authKeys.ACCESS_TOKEN, response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    cookieStore.set(authKeys.REFRESHTOKEN, response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    revalidatePath("/", "layout");
  }

  return response;
}
