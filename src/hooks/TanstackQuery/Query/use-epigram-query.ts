import { useQuery } from "@tanstack/react-query";
import {
  getEpigrams,
  getEpigramsCommentsList,
  getEpigramsDetail,
  getEpigramsToday,
} from "@/apis/Epigram/epigram-api";
import type {
  GetEpigramsCommentListRequest,
  GetEpigramsListRequest,
} from "@/apis/Epigram/epigram-api-types";
import { epigramKeys } from "../query-keys";

// GET epigrams
export const useGetEpigramListQuery = (params: GetEpigramsListRequest) => {
  return useQuery({
    queryKey: epigramKeys.list(params),
    queryFn: () => getEpigrams(params),
  });
};

// GET epigrams/today
export const useGetEpigramTodayQuery = () => {
  return useQuery({
    queryKey: epigramKeys.today(),
    queryFn: getEpigramsToday,
  });
};

// GET epigrams/id
export const useGetEpigramIdQuery = (id: number) => {
  return useQuery({
    queryKey: epigramKeys.detail(id),
    queryFn: () => getEpigramsDetail(id),
  });
};

// GET epigrams/id/comments
export const useGetEpigramCommentsQuery = (
  id: number,
  params: GetEpigramsCommentListRequest,
) => {
  return useQuery({
    queryKey: epigramKeys.comments(id, params),
    queryFn: () => getEpigramsCommentsList(id, params),
  });
};
