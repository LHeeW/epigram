"use client";

import { useRouter } from "next/navigation";
import { usePostAuthSignInMutation } from "./TanstackQuery/Mutation/use-auth-mutation";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

export const useSignInInput = () => {
  const router = useRouter();
  const { mutate, isPending } = usePostAuthSignInMutation();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const newErrors = {
      email: validateEmail(data.email as string),
      password: validatePassword(data.password as string),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return { handleSignIn, isPending, errors };
};
