import { useQuery } from "@tanstack/react-query";
import {
  getEmotionLogsMonthly,
  getEmotionLogsToday,
} from "@/apis/EmotionLog/emotion-log-api";
import type {
  GetEmotionLogsMonthlyRequest,
  GetEmotionLogsTodayRequest,
} from "@/apis/EmotionLog/emotion-log-api-types";
import { emotionLogKeys } from "../query-keys";

// GET emotionLogs/today
export const useGetEmotionLogsTodayQuery = (
  params: GetEmotionLogsTodayRequest,
) => {
  return useQuery({
    queryKey: emotionLogKeys.today(params),
    queryFn: () => getEmotionLogsToday(params),
  });
};

// GET emotionLogs/monthly
export const useEmotionLogsMonthlyQuery = (
  params: GetEmotionLogsMonthlyRequest,
) => {
  return useQuery({
    queryKey: emotionLogKeys.monthly(params),
    queryFn: () => getEmotionLogsMonthly(params),
  });
};
