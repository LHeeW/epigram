import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteEpigrams,
  deleteEpigramsLike,
  patchEpigrams,
  postEpigrams,
  postEpigramsLike,
} from "@/apis/Epigram/epigram-api";
import type {
  GetEpigramsDetailResponse,
  PatchEpigramsRequest,
} from "@/apis/Epigram/epigram-api-types";
import { epigramKeys } from "../query-keys";

// POST epigram
export const usePostEpigramMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEpigrams,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: epigramKeys.lists() });
    },
  });
};

// PATCH epigrams/id
export const usePatchEpigramsMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: PatchEpigramsRequest) =>
      patchEpigrams(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: epigramKeys.detail(id) });
    },
  });
};

// DELETE epigrams/id
export const useDeleteEpigramsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEpigrams(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: epigramKeys.detail(id),
      });
    },
  });
};

// POST epigrams/id/like | DELETE epigrams/id/like
export const useUpdateEpigramsLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      userAction,
    }: {
      id: number;
      userAction: "LIKE" | "UNLIKE";
    }) => {
      return userAction === "LIKE"
        ? postEpigramsLike(id)
        : deleteEpigramsLike(id);
    },
    onMutate: async ({ id, userAction }) => {
      await queryClient.cancelQueries({
        queryKey: epigramKeys.detail(id),
      });

      const prevData = queryClient.getQueryData(epigramKeys.detail(id));

      queryClient.setQueryData(
        epigramKeys.detail(id),
        (prev: GetEpigramsDetailResponse) => {
          if (!prev) return prev;

          return {
            ...prev,
            likeCount:
              userAction === "LIKE" ? prev.likeCount + 1 : prev.likeCount - 1,
            isLiked: userAction === "LIKE",
          };
        },
      );

      return { prevData };
    },
    onError: (_, { id }, context) => {
      queryClient.setQueryData(epigramKeys.detail(id), () => context?.prevData);
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({
        queryKey: epigramKeys.detail(id),
      });
    },
  });
};
