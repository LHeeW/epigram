import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  getEpigrams,
  getEpigramsCommentsList,
  getEpigramsDetail,
  getEpigramsToday,
} from "@/apis/Epigram/epigram-api";
import type {
  GetEpigramListResponse,
  GetEpigramsCommentListRequest,
  GetEpigramsCommentListResponse,
  GetEpigramsDetailResponse,
  GetEpigramsListRequest,
} from "@/apis/Epigram/epigram-api-types";
import { epigramKeys } from "../query-keys";

// GET epigrams
export const useGetEpigramListQuery = <TData = GetEpigramListResponse>(
  params: GetEpigramsListRequest,
  options?: Omit<
    UseQueryOptions<GetEpigramListResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: epigramKeys.list(params),
    queryFn: () => getEpigrams(params),
    ...options,
  });
};

// GET epigrams/today
export const useGetEpigramTodayQuery = <TData = GetEpigramsDetailResponse>(
  options?: Omit<
    UseQueryOptions<GetEpigramsDetailResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: epigramKeys.today(),
    queryFn: getEpigramsToday,
    ...options,
  });
};

// GET epigrams/id
export const useGetEpigramIdQuery = <TData = GetEpigramsDetailResponse>(
  id: number,
  options?: Omit<
    UseQueryOptions<GetEpigramsDetailResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: epigramKeys.detail(id),
    queryFn: () => getEpigramsDetail(id),
    ...options,
  });
};

// GET epigrams/id/comments
export const useGetEpigramCommentsQuery = <
  TData = GetEpigramsCommentListResponse,
>(
  id: number,
  params: GetEpigramsCommentListRequest,
  options?: Omit<
    UseQueryOptions<GetEpigramsCommentListResponse, Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: epigramKeys.comments(id, params),
    queryFn: () => getEpigramsCommentsList(id, params),
    ...options,
  });
};
