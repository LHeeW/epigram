import { postSignIn, postSignUp } from "@/actions/Auth/auth.action";
import { useMutation } from "@tanstack/react-query";

// POST auth/signUp
export const usePostAuthSignUpMutation = () => {
  return useMutation({
    mutationFn: postSignUp,
  });
};

// POST auth/signIn
export const usePostAuthSignInMutation = () => {
  return useMutation({
    mutationFn: postSignIn,
  });
};
