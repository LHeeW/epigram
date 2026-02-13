import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/apis/Comment/comment-api";
import type { GetCommentsRequest } from "@/apis/Comment/comment-api-types";
import { commentKeys } from "../query-keys";

// GET comments
export const useGetCommentsQuery = (params: GetCommentsRequest) => {
  return useQuery({
    queryKey: commentKeys.list(params),
    queryFn: () => getComments(params),
  });
};
