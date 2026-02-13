import { useQuery } from "@tanstack/react-query";
import {
  getUsersId,
  getUsersIdComments,
  getUsersMe,
} from "@/apis/User/user-api";
import type { GetUsersIdCommentsRequest } from "@/apis/User/user-api-types";
import { userKeys } from "../query-keys";

// GET users/me
export const useGetUserMeQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => getUsersMe(),
  });
};

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => getUsersMe(),
  });
};

// GET users/me
export const useGetUserDetailQuery = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUsersId(id),
  });
};

// GET users/id/comments
export const useGetUserCommentsQuery = (
  id: number,
  params: GetUsersIdCommentsRequest,
) => {
  return useQuery({
    queryKey: userKeys.comments(id, params),
    queryFn: () => getUsersIdComments(id, params),
  });
};
