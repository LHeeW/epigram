import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  getEmotionLogsMonthly,
  getEmotionLogsToday,
} from "@/apis/EmotionLog/emotion-log-api";
import type {
  EmotionLogsResponse,
  GetEmotionLogsMonthlyRequest,
  GetEmotionLogsTodayRequest,
} from "@/apis/EmotionLog/emotion-log-api-types";
import { emotionLogKeys } from "../query-keys";

// GET emotionLogs/today
export const useGetEmotionLogsTodayQuery = <TData = EmotionLogsResponse>(
  params: GetEmotionLogsTodayRequest,
  options?: Omit<
    UseQueryOptions<EmotionLogsResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: emotionLogKeys.today(params),
    queryFn: () => getEmotionLogsToday(params),
    ...options,
  });
};

// GET emotionLogs/monthly
export const useEmotionLogsMonthlyQuery = <TData = EmotionLogsResponse[]>(
  params: GetEmotionLogsMonthlyRequest,
  options?: Omit<
    UseQueryOptions<EmotionLogsResponse[], Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: emotionLogKeys.monthly(params),
    queryFn: () => getEmotionLogsMonthly(params),
    ...options,
  });
};
