import type { components } from "@/types/types";

// 오늘의 감정 저장
export type PostEmotionLogsTodayRequest =
  components["schemas"]["UpsertEmotionLogBody"]["emotion"];

// 오늘의 감정 조회
export type GetEmotionLogsTodayRequest = {
  userId: number;
};

// 월별 감정 조회
export type GetEmotionLogsMonthlyRequest = {
  userId: number;
  year: number;
  month: number;
};

// 오늘의 감정 저장 & 오늘의 감정 조회 & 월별 감정 조회
export type EmotionLogsResponse = components["schemas"]["EmotionLogType"];
