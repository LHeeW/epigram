import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postEmotionLogsToday } from "@/apis/EmotionLog/emotion-log-api";
import {
  EmotionLogsResponse,
  PostEmotionLogsTodayRequest,
} from "@/apis/EmotionLog/emotion-log-api-types";
import { emotionLogKeys } from "../query-keys";

// POST emotionlogs/today
export const usePostEmotionLogsTodayMutation = (
  options?: UseMutationOptions<
    EmotionLogsResponse,
    Error,
    PostEmotionLogsTodayRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEmotionLogsToday,
    ...options,
    onSuccess: (...args) => {
      // 감정 기록 관련 모든 쿼리 무효화 (오늘 & 월별 모두 갱신)
      queryClient.invalidateQueries({ queryKey: emotionLogKeys.all });

      // 외부 콜백 실행 (args 전체 전달로 TS 에러 방지)
      options?.onSuccess?.(...args);
    },
  });
};
