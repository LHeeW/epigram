import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCommentsId,
  patchCommentsId,
  postComments,
} from "@/apis/Comment/comment-api";
import type { PatchCommentsRequest } from "@/apis/Comment/comment-api-types";
import { commentKeys } from "../query-keys";

// POST comments
export const usePostCommentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.lists() });
    },
  });
};

// PATCH comments/id
export const useUpdateCommentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatchCommentsRequest }) =>
      patchCommentsId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.lists(),
      });
    },
  });
};

// DELETE comments/id
export const useDeleteCommentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentsId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.lists(),
      });
    },
  });
};
