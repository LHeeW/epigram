import type { components } from "@/types/types";
import { usePostEmotionLogsTodayMutation } from "../TanstackQuery/Mutation/use-emotionlog-mutation";
import { useGetEmotionLogsTodayQuery } from "../TanstackQuery/Query/use-emotionlog-query";
import { useGetUserMeQuery } from "../TanstackQuery/Query/use-user-query";

export const useEmotionLogClick = (
  emotionType: components["schemas"]["Emotion"],
) => {
  const { mutate } = usePostEmotionLogsTodayMutation();
  const { data: user } = useGetUserMeQuery();

  const { data: todayEmotion } = useGetEmotionLogsTodayQuery(
    {
      userId: user?.id as number,
    },
    { enabled: !!user?.id },
  );

  const isSelected = todayEmotion?.emotion === emotionType;

  const handleEmotionClick = (emotionTitle: string) => {
    mutate(
      { emotion: emotionType },
      {
        onSuccess: () => {
          alert(`오늘의 기분: ${emotionTitle}`);
        },
      },
    );
  };

  return { isSelected, handleEmotionClick };
};
