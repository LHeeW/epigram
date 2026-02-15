import {
  type UseMutationOptions,
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
import { commentKeys, epigramKeys } from "../query-keys";

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
      const [_, variables, __] = args;
      queryClient.invalidateQueries({
        queryKey: epigramKeys.comments(variables.epigramId),
      });
      options?.onSuccess?.(...args);
    },
  });
};

// PATCH comments/id
export const useUpdateCommentsMutation = (
  options?: UseMutationOptions<
    PatchCommentsResponse,
    Error,
    { id: number; epigramId: number; data: PatchCommentsRequest }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => patchCommentsId(id, data),
    ...options,
    onSuccess: (...args) => {
      const [_, variables, __] = args;
      queryClient.invalidateQueries({
        queryKey: epigramKeys.comments(variables.epigramId),
      });
      options?.onSuccess?.(...args);
    },
  });
};

// DELETE comments/id
export const useDeleteCommentsMutation = (
  options?: UseMutationOptions<
    Record<string, any>,
    Error,
    { id: number; epigramId: number }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteCommentsId(id),
    ...options,
    onSuccess: (...args) => {
      const [_, variables, __] = args;
      queryClient.invalidateQueries({
        queryKey: epigramKeys.comments(variables.epigramId),
      });
      options?.onSuccess?.(...args);
    },
  });
};
