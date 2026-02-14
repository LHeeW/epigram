import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { SiginAction } from "@/actions/signin.action";
import { postSignUp } from "@/apis/Auth/auth-api";
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/apis/Auth/auth-api-types";

// POST auth/signUp
export const usePostAuthSignUpMutation = (
  options?: UseMutationOptions<SignUpResponse, Error, SignUpRequest>,
) => {
  return useMutation({
    mutationFn: postSignUp,
    ...options,
  });
};

// POST auth/signIn
export const usePostAuthSignInMutation = (
  options?: UseMutationOptions<SignInResponse, Error, SignInRequest>,
) => {
  return useMutation({
    mutationFn: SiginAction,
    ...options,
  });
};
