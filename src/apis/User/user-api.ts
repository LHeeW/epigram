import { initFetch } from "@/utils/init-fetch";
import { createQueryParams } from "@/utils/query-params";
import type {
  GetUsersIdCommentsRequest,
  GetUsersIdCommentsResponse,
  GetUsersIdRequest,
  PatchUsersMeRequest,
  UserResponse,
} from "./user-api-types";

// 내 정보 조회
export async function getUsersMe() {
  return await initFetch<UserResponse>("/users/me");
}

// 내 정보 수정
export async function patchUsersMe(data: PatchUsersMeRequest) {
  return await initFetch<UserResponse>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 특정 유저 조회
export async function getUsersId(id: GetUsersIdRequest) {
  return await initFetch<UserResponse>(`/users/${id}`);
}

// 특정 유저의 댓글 목록 조회
export async function getUsersIdComments(
  id: number,
  data: GetUsersIdCommentsRequest,
) {
  const query = createQueryParams(data);

  return await initFetch<GetUsersIdCommentsResponse>(
    `/users/${id}/comments?${query}`,
  );
}
