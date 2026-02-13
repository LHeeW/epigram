import { useMutation } from "@tanstack/react-query";
import { postImagesUpload } from "@/apis/Image/image-api";

// POST images/upload
export const usePostImageUploadMutation = () => {
  return useMutation({
    mutationFn: postImagesUpload,
  });
};
