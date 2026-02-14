import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getComments } from "@/apis/Comment/comment-api";
import type {
  GetCommentsRequest,
  GetCommentsResponse,
} from "@/apis/Comment/comment-api-types";
import { commentKeys } from "../query-keys";

// GET comments
export const useGetCommentsQuery = <TData = GetCommentsResponse>(
  params: GetCommentsRequest,
  options?: Omit<
    UseQueryOptions<GetCommentsResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: commentKeys.list(params),
    queryFn: () => getComments(params),
    ...options,
  });
};
