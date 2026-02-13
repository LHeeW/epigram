"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SignInRequest } from "@/apis/Auth/auth-api-types";
import { validationEmail, validationPassword } from "@/utils/validation";
import { usePostAuthSignInMutation } from "../TanstackQuery/Mutation/use-auth-mutation";

export const useSigninInput = () => {
  const router = useRouter();
  const { mutate, isPending } = usePostAuthSignInMutation();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    const data = rawFormData as unknown as SignInRequest;

    const newErrors = {
      email: validationEmail(data.email),
      password: validationPassword(data.password),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    mutate(data, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    handleSignIn(formData);
  };

  return { handleSubmit, isPending, errors };
};
