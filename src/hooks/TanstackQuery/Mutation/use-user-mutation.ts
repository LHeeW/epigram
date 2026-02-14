import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { patchUsersMe } from "@/apis/User/user-api";
import type {
  PatchUsersMeRequest,
  UserResponse,
} from "@/apis/User/user-api-types";
import { userKeys } from "../query-keys";

// PATCH users/me
export const usePatchUserMeMutation = (
  options?: UseMutationOptions<UserResponse, Error, PatchUsersMeRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUsersMe,
    ...options,
    onSuccess: (...args) => {
      // 내 정보가 수정되었으므로 'me' 쿼리를 무효화하여 최신화함
      queryClient.invalidateQueries({ queryKey: userKeys.me() });

      // 외부 콜백(예: 알림창 띄우기, 페이지 이동) 실행
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
  });
};
