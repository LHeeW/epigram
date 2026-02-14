import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { postImagesUpload } from "@/apis/Image/image-api";
import type { PostImagesUploadResponse } from "@/apis/Image/image-api-types";

// POST images/upload
export const usePostImageUploadMutation = (
  // TData: PostImagesUploadResponse, TError: Error, TVariables: FormData
  options?: UseMutationOptions<PostImagesUploadResponse, Error, FormData>,
) => {
  return useMutation({
    mutationFn: postImagesUpload,
    ...options,
    onSuccess: (...args) => {
      // 이미지 업로드는 보통 특정 리스트를 무효화하기보다
      // 성공 후 반환된 URL을 사용하는 경우가 많으므로 외부 콜백만 연결합니다.
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
