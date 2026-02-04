import type { GetUsersIdCommentsRequest } from "@/actions/User/user";
import {
  getUsersId,
  getUsersIdComments,
  getUsersMe,
} from "@/actions/User/user.action";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userKeys } from "../query-keys";

// GET users/me
export const useGetUserMeQuery = () => {
  return useSuspenseQuery({
    queryKey: userKeys.me(),
    queryFn: () => getUsersMe(),
  });
};

// GET users/me
export const useGetUserDetailQuery = (id: number) => {
  return useSuspenseQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUsersId(id),
  });
};

// GET users/id/comments
export const useGetUserCommentsQuery = (
  id: number,
  params: GetUsersIdCommentsRequest
) => {
  return useSuspenseQuery({
    queryKey: userKeys.comments(id, params),
    queryFn: () => getUsersIdComments(id, params),
  });
};
