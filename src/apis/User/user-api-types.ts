import type { components } from "@/types/types";

// 내 정보 조회
export type UserResponse = components["schemas"]["User"];

// 내 정보 수정
export type PatchUsersMeRequest = components["schemas"]["UpdateUserBody"];

// 특정 유저 조회
export type GetUsersIdRequest = components["schemas"]["Id"];

// 특정 유저의 댓글 목록 조회
export type GetUsersIdCommentsRequest = {
  limit: number;
  cursor?: number;
};
export type GetUsersIdCommentsResponse =
  components["schemas"]["CursorBasedPaginationResponse_CommentType_"];
