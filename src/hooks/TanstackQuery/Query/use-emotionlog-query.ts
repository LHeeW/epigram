import type {
  GetEmotionLogsMonthlyRequest,
  GetEmotionLogsTodayRequest,
} from "@/actions/EmotionLog/emotion-log";
import {
  getEmotionLogsMonthly,
  getEmotionLogsToday,
} from "@/actions/EmotionLog/emotion-log.action";
import { useSuspenseQuery } from "@tanstack/react-query";
import { emotionLogKeys } from "../query-keys";

// GET emotionLogs/today
export const useGetEmotionLogsTodayQuery = (
  params: GetEmotionLogsTodayRequest
) => {
  return useSuspenseQuery({
    queryKey: emotionLogKeys.today(params),
    queryFn: () => getEmotionLogsToday(params),
  });
};

// GET emotionLogs/monthly
export const useEmotionLogsMonthlyQuery = (
  params: GetEmotionLogsMonthlyRequest
) => {
  return useSuspenseQuery({
    queryKey: emotionLogKeys.monthly(params),
    queryFn: () => getEmotionLogsMonthly(params),
  });
};
