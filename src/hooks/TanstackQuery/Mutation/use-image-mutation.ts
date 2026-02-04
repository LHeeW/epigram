import { postImagesUpload } from "@/actions/Image/image.action";
import { useMutation } from "@tanstack/react-query";

// POST images/upload
export const usePostImageUploadMutation = () => {
  return useMutation({
    mutationFn: postImagesUpload,
  });
};
