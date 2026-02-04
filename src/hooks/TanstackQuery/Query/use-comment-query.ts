import type { GetCommentsRequest } from "@/actions/Comment/comment";
import { getComments } from "@/actions/Comment/comment.action";
import { useSuspenseQuery } from "@tanstack/react-query";
import { commentKeys } from "../query-keys";

// GET comments
export const useGetCommentsQuery = (params: GetCommentsRequest) => {
  return useSuspenseQuery({
    queryKey: commentKeys.list(params),
    queryFn: () => getComments(params),
  });
};
