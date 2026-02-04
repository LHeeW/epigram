import type { components } from "@/types/types";

// 댓글 작성
export type PostCommentsRequest = components["schemas"]["CreateCommentBody"];
export type PostCommentsResponse = components["schemas"]["CommentType"];

// 댓글 목록 조회
export type GetCommentsRequest = {
  limit: number;
  cursor?: number;
};
export type GetCommentsResponse =
  components["schemas"]["CursorBasedPaginationResponse_CommentType_"];

// 댓글 수정
export type PatchCommentsRequest = components["schemas"]["UpdateCommentBody"];
export type PatchCommentsResponse = components["schemas"]["CommentType"];
