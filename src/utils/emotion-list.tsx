import AngryEmotion from "@/../public/icons/angry_face_icon.svg";
import HeartEmotion from "@/../public/icons/heart_face_icon.svg";
import SadEmotion from "@/../public/icons/sad_face_icon.svg";
import SmilingEmotion from "@/../public/icons/smiling_face_icon.svg";
import ThinkingEmotion from "@/../public/icons/thinking_face_icon.svg";
import type { components } from "@/types/types";

export type EmotionListType = {
  icon: React.ReactNode;
  emotion_title: string;
  emotion_type: components["schemas"]["Emotion"];
};

export const emotionList: EmotionListType[] = [
  {
    icon: <HeartEmotion />,
    emotion_title: "감동",
    emotion_type: "MOVED",
  },
  {
    icon: <SmilingEmotion />,
    emotion_title: "기쁨",
    emotion_type: "HAPPY",
  },
  {
    icon: <ThinkingEmotion />,
    emotion_title: "고민",
    emotion_type: "WORRIED",
  },
  {
    icon: <SadEmotion />,
    emotion_title: "슬픔",
    emotion_type: "SAD",
  },
  {
    icon: <AngryEmotion />,
    emotion_title: "분노",
    emotion_type: "ANGRY",
  },
];
