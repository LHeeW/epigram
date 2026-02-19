import Image from "next/image";
import { useState } from "react";
import SampleImage from "@/../public/images/user.webp";
import styles from "./comment-component.module.css";

interface CommentFormProps {
  userImage?: string | null;
  initialContent?: string;
  initialIsPrivate?: boolean;
  submitLabel?: string;
  onSubmit: (content: string, isPrivate: boolean) => void;
  onCancel?: () => void;
}

export default function CommentForm({
  userImage,
  initialContent = "",
  initialIsPrivate = false,
  submitLabel = "저장",
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [content, setContent] = useState(initialContent);
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content, isPrivate);

    if (!initialContent) {
      setContent("");
      setIsPrivate(false);
    }
  };

  return (
    <div className={styles.comment_image_input_container}>
      <Image
        className={styles.user_profile_image}
        src={userImage || SampleImage}
        alt="이미지"
        width={48}
        height={48}
      />
      <div className={styles.comment_input_container}>
        <textarea
          className={styles.comment_input}
          maxLength={100}
          placeholder="100자 이내로 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.private_save_container}>
          <div className={styles.private_btn_container}>
            <span className={styles.private_text}>비공개</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.action_btns}>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={styles.cancel_btn}
              >
                취소
              </button>
            )}
            <button
              className={styles.save_btn}
              type="button"
              onClick={handleSubmit}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
