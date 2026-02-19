import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getEpigrams,
  getEpigramsCommentsList,
} from "@/apis/Epigram/epigram-api";
import type {
  GetEpigramsCommentListRequest,
  GetEpigramsListRequest,
} from "@/apis/Epigram/epigram-api-types";
import { epigramKeys } from "../query-keys";

// GET EpigramList Infinite
export const useGetEpigramListInfiniteQuery = (
  params: Omit<GetEpigramsListRequest, "cursor">,
) => {
  return useInfiniteQuery({
    queryKey: epigramKeys.list(params),
    queryFn: ({ pageParam = 0 }) =>
      getEpigrams({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });
};

// GET Epigram CommentsList Infinite
export const useGetEpigramCommentsInfiniteQuery = (
  id: number,
  params: Omit<GetEpigramsCommentListRequest, "cursor">,
) => {
  return useInfiniteQuery({
    queryKey: epigramKeys.comment(id, params),
    queryFn: ({ pageParam = 0 }) =>
      getEpigramsCommentsList(id, { ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });
};
