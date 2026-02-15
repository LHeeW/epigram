import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
  PatchEpigramsResponse,
  PostEpigramsRequest,
  PostEpigramsResponse,
} from "@/apis/Epigram/epigram-api-types";
import { epigramKeys } from "../query-keys";

// POST epigram
export const usePostEpigramMutation = (
  options?: UseMutationOptions<
    PostEpigramsResponse,
    Error,
    PostEpigramsRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEpigrams,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: epigramKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};

// PATCH epigrams/id
export const usePatchEpigramsMutation = (
  id: number,
  options?: UseMutationOptions<
    PatchEpigramsResponse,
    Error,
    PatchEpigramsRequest
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: PatchEpigramsRequest) =>
      patchEpigrams(id, updatedData),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: epigramKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: epigramKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};

// DELETE epigrams/id
export const useDeleteEpigramsMutation = (
  options?: UseMutationOptions<Record<string, any>, Error, number>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEpigrams(id),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: epigramKeys.lists() });
      options?.onSuccess?.(...args);
    },
  });
};

// POST epigrams/id/like | DELETE epigrams/id/like
// 1. Context 타입(낙관적 업데이트용)
interface LikeMutationContext {
  prevData?: GetEpigramsDetailResponse;
}

export const useUpdateEpigramsLikeMutation = (
  options?: UseMutationOptions<
    GetEpigramsDetailResponse,
    Error,
    { id: number; userAction: "LIKE" | "UNLIKE" },
    LikeMutationContext
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, userAction }) => {
      return userAction === "LIKE"
        ? postEpigramsLike(id)
        : deleteEpigramsLike(id);
    },
    ...options,
    // 1. onMutate 수정
    onMutate: async (...args) => {
      const [{ id, userAction }] = args; // 첫 번째 인자에서 id, userAction 추출

      await queryClient.cancelQueries({ queryKey: epigramKeys.detail(id) });
      const prevData = queryClient.getQueryData<GetEpigramsDetailResponse>(
        epigramKeys.detail(id),
      );

      if (prevData) {
        queryClient.setQueryData<GetEpigramsDetailResponse>(
          epigramKeys.detail(id),
          {
            ...prevData,
            likeCount:
              userAction === "LIKE"
                ? prevData.likeCount + 1
                : prevData.likeCount - 1,
            isLiked: userAction === "LIKE",
          },
        );
      }

      // 외부에서 넘긴 onMutate 실행 시 인자 그대로 전달
      const customContext = (await options?.onMutate?.(...args)) || {};
      return { prevData, ...customContext };
    },
    // 2. onError 수정
    onError: (...args) => {
      const [_, variables, context] = args;
      if (context?.prevData) {
        queryClient.setQueryData(
          epigramKeys.detail(variables.id),
          context.prevData,
        );
      }
      options?.onError?.(...args); // 인자 그대로 토스
    },
    // 3. onSettled 수정
    onSettled: (...args) => {
      const [_, __, variables] = args;
      queryClient.invalidateQueries({
        queryKey: epigramKeys.detail(variables.id),
      });
      options?.onSettled?.(...args); // 인자 그대로 토스
    },
  });
};
