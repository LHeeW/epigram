import type { GetCommentsRequest } from "@/apis/Comment/comment-api-types";
import type {
  GetEmotionLogsMonthlyRequest,
  GetEmotionLogsTodayRequest,
} from "@/apis/EmotionLog/emotion-log-api-types";
import type {
  GetEpigramsCommentListRequest,
  GetEpigramsListRequest,
} from "@/apis/Epigram/epigram-api-types";
import type { GetUsersIdCommentsRequest } from "@/apis/User/user-api-types";

// User
export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
  comments: (id: number, params: GetUsersIdCommentsRequest) =>
    [...userKeys.detail(id), "comments", params] as const,
};

// Image
export const imageKeys = {
  all: ["images"] as const,
  upload: () => [...imageKeys.all, "upload"] as const,
};

// Epigram
export const epigramKeys = {
  all: ["epigrams"] as const,
  lists: () => [...epigramKeys.all, "list"] as const,
  list: (params: GetEpigramsListRequest) =>
    [...epigramKeys.all, "list", params] as const,
  today: () => [...epigramKeys.all, "today"] as const,
  detail: (id: number) => [...epigramKeys.all, id] as const,
  comments: (id: number, params: GetEpigramsCommentListRequest) =>
    [...epigramKeys.detail(id), "comments", params] as const,
};

// EmotionLog
export const emotionLogKeys = {
  all: ["emotionLog"] as const,
  today: (params: GetEmotionLogsTodayRequest) =>
    [...emotionLogKeys.all, "today", params] as const,
  monthly: (params: GetEmotionLogsMonthlyRequest) =>
    [...emotionLogKeys.all, "monthly", params] as const,
};

// Comment
export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (params: GetCommentsRequest) =>
    [...commentKeys.all, "list", params] as const,
};
