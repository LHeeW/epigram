"use client";

import AuthInput from "@/components/AuthInput/auth-input";
import { useSigninInput } from "@/hooks/Auth/useSigninInput";
import styles from "./signiin-input-form.module.css";

export default function SignInInputForm() {
  const { handleSubmit, isPending, errors } = useSigninInput();

  return (
    <form
      className={styles.form_container}
      onSubmit={handleSubmit}
      method="POST"
      noValidate
    >
      <div className={styles.input_container}>
        <AuthInput
          type="email"
          name="email"
          placeholder="이메일"
          error={errors.email}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="비밀번호"
          error={errors.password}
        />
      </div>
      <button className={styles.btn} type="submit" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
