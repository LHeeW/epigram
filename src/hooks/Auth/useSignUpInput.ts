"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SignUpRequest } from "@/apis/Auth/auth-api-types";
import {
  validationEmail,
  validationNickname,
  validationPassword,
  validationPasswordConfirm,
} from "@/utils/validation";
import { usePostAuthSignUpMutation } from "../TanstackQuery/Mutation/use-auth-mutation";

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
    const rawFormData = Object.fromEntries(formData.entries());
    const data = rawFormData as unknown as SignUpRequest;

    const newErrors = {
      email: validationEmail(data.email),
      nickname: validationNickname(data.nickname),
      password: validationPassword(data.password),
      passwordConfirmation: validationPasswordConfirm(
        data.password,
        data.passwordConfirmation,
      ),
    };

    setErrors(newErrors);
    if (Object.values(errors).some((msg) => msg !== "")) return;

    mutate(data, {
      onSuccess: () => {
        alert("회원가입이 완료되었습니다.");
        router.replace("/login");
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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    handleSignUp(formData);
  };

  return { handleSubmit, isPending, errors };
};
