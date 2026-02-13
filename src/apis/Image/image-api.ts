import { initFetch } from "@/utils/init-fetch";
import type { PostImagesUploadResponse } from "./image-api-types";

// 이미지 업로드
// 중요한건 파일 업로드를 FormData형식으로 해야함
/**
 * const file = e.target.files?.[0];
 *
 * if(!file) return;
 * const fomrData = new FormData();
 * formData.append('image',file);
 * mutation해주는 곳에서 이런식으로 적용하기
 */
export async function postImagesUpload(formData: FormData) {
  return await initFetch<PostImagesUploadResponse>("/images/upload", {
    method: "POST",
    body: formData,
  });
}
