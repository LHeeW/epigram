"use client";

import AuthInput from "@/components/AuthInput/auth-input";

import { useSignUpInput } from "@/hooks/useSignUpInput";

import styles from "./input-form.module.css";

export default function InputForm() {
  const { handleSignUp, isPending, errors } = useSignUpInput();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSignUp(formData);
  };

  return (
    <form
      className={styles.form_container}
      onSubmit={handleSubmit}
      method="POST"
      noValidate
    >
      <AuthInput
        label="이메일"
        type="email"
        id="email"
        name="email"
        placeholder="이메일"
        error={errors.email}
      />
      <AuthInput
        label="비밀번호"
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호"
        error={errors.password}
      />
      <AuthInput
        label="비밀번호 확인"
        type="password"
        id="passwordConfirm"
        name="passwordConfirmation"
        placeholder="비밀번호 확인"
        error={errors.passwordConfirmation}
      />
      <AuthInput
        label="닉네임"
        type="text"
        id="nickname"
        name="nickname"
        placeholder="닉네임"
        error={errors.nickname}
      />
      <button className={styles.btn} type="submit" disabled={isPending}>
        {isPending ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}
