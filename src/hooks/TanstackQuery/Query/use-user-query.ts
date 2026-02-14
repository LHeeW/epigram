import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  getUsersId,
  getUsersIdComments,
  getUsersMe,
} from "@/apis/User/user-api";
import type {
  GetUsersIdCommentsRequest,
  GetUsersIdCommentsResponse,
  UserResponse,
} from "@/apis/User/user-api-types";
import { userKeys } from "../query-keys";

// GET users/me
export const useGetUserMeQuery = <TData = UserResponse>(
  options?: Omit<
    UseQueryOptions<UserResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => getUsersMe(),
    ...options,
  });
};

// GET users/me
export const useGetUserDetailQuery = <TData = UserResponse>(
  id: number,
  options?: Omit<
    UseQueryOptions<UserResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUsersId(id),
    ...options,
  });
};

// GET users/id/comments
export const useGetUserCommentsQuery = <TData = GetUsersIdCommentsResponse>(
  id: number,
  params: GetUsersIdCommentsRequest,
  options?: Omit<
    UseQueryOptions<GetUsersIdCommentsResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: userKeys.comments(id, params),
    queryFn: () => getUsersIdComments(id, params),
    ...options,
  });
};
