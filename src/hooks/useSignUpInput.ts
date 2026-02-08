"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
} from "@/utils/validation";

import { usePostAuthSignUpMutation } from "./TanstackQuery/Mutation/use-auth-mutation";

export const useSignUpInput = () => {
  const router = useRouter();
  const { mutate, isPending } = usePostAuthSignUpMutation();

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSignUp = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const newErrors = {
      email: validateEmail(data.email as string),
      nickname: validateNickname(data.nickname as string),
      password: validatePassword(data.password as string),
      passwordConfirmation: validatePasswordConfirm(
        data.password as string,
        data.passwordConfirmation as string
      ),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    mutate(data, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
      },
      onError: (error) => {
        if (error.message === "Internal Server Error") {
          alert("중복된 닉네임입니다.");
        } else {
          alert(error.message);
        }
      },
    });
  };

  return { handleSignUp, isPending, errors };
};
