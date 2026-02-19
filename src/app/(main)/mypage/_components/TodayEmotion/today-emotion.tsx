"use client";

import EmotionList from "@/components/EmotionList/emotioin-list";
import styles from "./today-emotion.module.css";

export default function TodayEmotion() {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "")
    .slice(0, -1);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h3 className={styles.title}>오늘의 감정</h3>
        <h3 className={styles.date}>{formattedDate}</h3>
      </div>
      <EmotionList className={styles.emotion_list} />
    </div>
  );
}
