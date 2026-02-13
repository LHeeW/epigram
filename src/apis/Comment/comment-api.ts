import { initFetch } from "@/utils/init-fetch";
import { createQueryParams } from "@/utils/query-params";
import type {
  GetCommentsRequest,
  GetCommentsResponse,
  PatchCommentsRequest,
  PatchCommentsResponse,
  PostCommentsRequest,
  PostCommentsResponse,
} from "./comment-api-types";

// 댓글 작성
export async function postComments(data: PostCommentsRequest) {
  return await initFetch<PostCommentsResponse>("/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 댓글 목록 조회
export async function getComments(data: GetCommentsRequest) {
  const query = createQueryParams(data);

  return await initFetch<GetCommentsResponse>(`/comments?${query}`);
}

// 댓글 수정
export async function patchCommentsId(id: number, data: PatchCommentsRequest) {
  return await initFetch<PatchCommentsResponse>(`/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 댓글 삭제
export async function deleteCommentsId(id: number) {
  return await initFetch<Record<string, any>>(`/comments/${id}`, {
    method: "DELETE",
  });
}
