import { emotionList } from "@/utils/emotion-list";
import Emotion from "./Emotion/emotion";
import styles from "./emotion-list.module.css";

export default function EmotionList() {
  return (
    <div className={styles.container}>
      {emotionList.map((emotion) => (
        <Emotion key={emotion.emotion_type} emotion={emotion}>
          {emotion.icon}
        </Emotion>
      ))}
    </div>
  );
}
