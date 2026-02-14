import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteCommentsId,
  patchCommentsId,
  postComments,
} from "@/apis/Comment/comment-api";
import type {
  PatchCommentsRequest,
  PatchCommentsResponse,
  PostCommentsRequest,
  PostCommentsResponse,
} from "@/apis/Comment/comment-api-types";
import { commentKeys } from "../query-keys";

// POST comments
export const usePostCommentsMutation = (
  options?: UseMutationOptions<
    PostCommentsResponse,
    Error,
    PostCommentsRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComments,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};

// PATCH comments/id
export const useUpdateCommentsMutation = (
  options?: UseMutationOptions<
    PatchCommentsResponse,
    Error,
    { id: number; data: PatchCommentsRequest }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => patchCommentsId(id, data),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};

// DELETE comments/id
export const useDeleteCommentsMutation = (
  options?: UseMutationOptions<Record<string, any>, Error, number>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentsId,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};
