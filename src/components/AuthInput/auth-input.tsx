"use client";

import { useState } from "react";

import VisibilityOffIcon from "@/../public/icons/visibility_off_icon.svg";
import VisibilityOnIcon from "@/../public/icons/visibility_on_icon.svg";

import styles from "./auth-input.module.css";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function AuthInput({
  label,
  type,
  error,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={styles.error_container}>
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}

        <div className={styles.input_container}>
          <input
            className={`${styles.input} ${error && styles.input_error}`}
            type={inputType}
            {...props}
          />
          {type === "password" && (
            <button
              className={styles.visible_btn}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOnIcon className={styles.on} />
              ) : (
                <VisibilityOffIcon className={styles.off} />
              )}
            </button>
          )}
        </div>
      </div>
      {error && <span className={styles.error_text}>{error}</span>}
    </div>
  );
}
