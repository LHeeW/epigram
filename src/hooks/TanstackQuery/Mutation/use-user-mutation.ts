import { patchUsersMe } from "@/actions/User/user.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../query-keys";

// PATCH users/me
export const usePatchUserMeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUsersMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
