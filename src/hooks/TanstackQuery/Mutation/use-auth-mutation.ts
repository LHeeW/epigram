import { useMutation } from "@tanstack/react-query";
import { SiginAction } from "@/actions/signin.action";
import { postSignUp } from "@/apis/Auth/auth-api";

// POST auth/signUp
export const usePostAuthSignUpMutation = () => {
  return useMutation({
    mutationFn: postSignUp,
  });
};

// POST auth/signIn
export const usePostAuthSignInMutation = () => {
  return useMutation({
    mutationFn: SiginAction,
  });
};
