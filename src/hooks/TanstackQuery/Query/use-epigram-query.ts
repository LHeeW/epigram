import type {
  GetEpigramsCommentListRequest,
  GetEpigramsListRequest,
} from "@/actions/Epigram/epigram";
import {
  getEpigrams,
  getEpigramsCommentsList,
  getEpigramsDetail,
  getEpigramsToday,
} from "@/actions/Epigram/epigram.action";
import { useSuspenseQuery } from "@tanstack/react-query";
import { epigramKeys } from "../query-keys";

// GET epigrams
export const useGetEpigramListQuery = (params: GetEpigramsListRequest) => {
  return useSuspenseQuery({
    queryKey: epigramKeys.list(params),
    queryFn: () => getEpigrams(params),
  });
};

// GET epigrams/today
export const useGetEpigramTodayQuery = () => {
  return useSuspenseQuery({
    queryKey: epigramKeys.today(),
    queryFn: getEpigramsToday,
  });
};

// GET epigrams/id
export const useGetEpigramIdQuery = (id: number) => {
  return useSuspenseQuery({
    queryKey: epigramKeys.detail(id),
    queryFn: () => getEpigramsDetail(id),
  });
};

// GET epigrams/id/comments
export const useGetEpigramCommentsQuery = (
  id: number,
  params: GetEpigramsCommentListRequest
) => {
  return useSuspenseQuery({
    queryKey: epigramKeys.comments(id, params),
    queryFn: () => getEpigramsCommentsList(id, params),
  });
};
