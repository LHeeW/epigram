import { initFetch } from "@/utils/init-fetch";
import { createQueryParams } from "@/utils/query-params";
import type {
  GetEpigramListResponse,
  GetEpigramsCommentListRequest,
  GetEpigramsCommentListResponse,
  GetEpigramsDetailResponse,
  GetEpigramsListRequest,
  PatchEpigramsRequest,
  PatchEpigramsResponse,
  PostEpigramsRequest,
  PostEpigramsResponse,
} from "./epigram-api-types";

// 에피그램 작성
export async function postEpigrams(data: PostEpigramsRequest) {
  return await initFetch<PostEpigramsResponse>("/epigrams", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 에피그램 목록 조회
export async function getEpigrams(data: GetEpigramsListRequest) {
  const query = createQueryParams(data);

  return await initFetch<GetEpigramListResponse>(`/epigrams?${query}`);
}

// 오늘의 에피그램 조회
export async function getEpigramsToday() {
  return await initFetch<GetEpigramsDetailResponse>("/epigrams/today");
}

// 에피그램 상세 조회
export async function getEpigramsDetail(id: number) {
  return await initFetch<GetEpigramsDetailResponse>(`/epigrams/${id}`);
}

// 에피그램 수정
export async function patchEpigrams(id: number, data: PatchEpigramsRequest) {
  return await initFetch<PatchEpigramsResponse>(`/epigrams/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 에피그램 삭제
export async function deleteEpigrams(id: number) {
  return await initFetch<Record<string, any>>(`/epigrams/${id}`, {
    method: "DELETE",
  });
}

// 에피그램 좋아요 추가
export async function postEpigramsLike(id: number) {
  return await initFetch<GetEpigramsDetailResponse>(`/epigrams/${id}/like`, {
    method: "POST",
  });
}

// 에피그램 좋아요 제거
export async function deleteEpigramsLike(id: number) {
  return await initFetch<GetEpigramsDetailResponse>(`/epigrams/${id}/like`, {
    method: "DELETE",
  });
}

// 에피그램 댓글 목록 조회
export async function getEpigramsCommentsList(
  id: number,
  data: GetEpigramsCommentListRequest,
) {
  const query = createQueryParams(data);

  return await initFetch<GetEpigramsCommentListResponse>(
    `/epigrams/${id}/comments?${query}`,
  );
}
