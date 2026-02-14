"use client";

import { useEmotionLogClick } from "@/hooks/Emotion/useEmotionLogClick";
import type { EmotionListType } from "@/utils/emotion-list";
import styles from "./emotion.module.css";

interface EmotionProps {
  children: React.ReactNode;
  emotion: EmotionListType;
}

export default function Emotion({ children, emotion }: EmotionProps) {
  const { isSelected, handleEmotionClick } = useEmotionLogClick(
    emotion.emotion_type,
  );

  return (
    <button
      className={styles.container}
      type="button"
      onClick={() => handleEmotionClick(emotion.emotion_title)}
    >
      <div
        className={`${styles.emotion_icon} ${isSelected ? styles.selectedEmotion : ""}`}
      >
        {children}
      </div>
      <span className={styles.emotion_title}>{emotion.emotion_title}</span>
    </button>
  );
}
