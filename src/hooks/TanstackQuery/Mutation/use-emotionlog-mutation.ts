import { postEmotionLogsToday } from "@/actions/EmotionLog/emotion-log.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emotionLogKeys } from "../query-keys";

// POST emotionlogs/today
export const usePostEmotionLogsTodayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEmotionLogsToday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emotionLogKeys.all });
    },
  });
};
