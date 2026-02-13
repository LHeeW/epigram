import type { components } from "@/types/types";

// 에피그램 작성
export type PostEpigramsRequest = components["schemas"]["CreateEpigramBody"];
export type PostEpigramsResponse = components["schemas"]["EpigramListType"];

// 에피그램 목록 조회
export type GetEpigramsListRequest = {
  limit: number;
  cursor?: number;
  keyword?: string;
  writerId?: number;
};
export type GetEpigramListResponse =
  components["schemas"]["CursorBasedPaginationResponse_EpigramListType_"];

// 오늘의 에피그램 조회 & 에피그램 상세 조회 & 에피그램 좋아요 추가 & 에피그램 좋아요 제거
export type GetEpigramsDetailResponse =
  components["schemas"]["EpigramDetailType"];

// 에피그램 수정
export type PatchEpigramsRequest = components["schemas"]["UpdateEpigramBody"];
export type PatchEpigramsResponse = components["schemas"]["EpigramListType"];

// 에피그램 댓글 목록 조회
export type GetEpigramsCommentListRequest = {
  limit: number;
  cursor?: number;
};
export type GetEpigramsCommentListResponse =
  components["schemas"]["CursorBasedPaginationResponse_CommentType_"];
