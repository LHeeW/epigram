import { initFetch } from "@/utils/init-fetch";
import { createQueryParams } from "@/utils/query-params";
import type {
  EmotionLogsResponse,
  GetEmotionLogsMonthlyRequest,
  GetEmotionLogsTodayRequest,
  PostEmotionLogsTodayRequest,
} from "./emotion-log-api-types";

// 오늘의 감정 저장
export async function postEmotionLogsToday(data: PostEmotionLogsTodayRequest) {
  return await initFetch<EmotionLogsResponse>("/emotionLogs/today", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 오늘의 감정 조회
export async function getEmotionLogsToday(data: GetEmotionLogsTodayRequest) {
  const query = createQueryParams(data);

  return await initFetch<EmotionLogsResponse>(`/emotionLogs/today?${query}`);
}

// 월별 감정 조회
export async function getEmotionLogsMonthly(
  data: GetEmotionLogsMonthlyRequest,
) {
  const query = createQueryParams(data);

  return await initFetch<EmotionLogsResponse[]>(
    `/emotionLogs/monthly?${query}`,
  );
}
