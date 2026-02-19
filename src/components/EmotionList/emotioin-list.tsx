import { emotionList } from "@/utils/emotion-list";
import Emotion from "./Emotion/emotion";
import styles from "./emotion-list.module.css";

interface EmotionListProps {
  className?: string;
}

export default function EmotionList({ className }: EmotionListProps) {
  return (
    <div className={styles.container}>
      {emotionList.map((emotion) => (
        <Emotion
          key={emotion.emotion_type}
          emotion={emotion}
          className={className ?? ""}
        >
          {emotion.icon}
        </Emotion>
      ))}
    </div>
  );
}
