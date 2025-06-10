import { useMutation } from '@tanstack/react-query';
import { SignInCredentials } from '@/api/sign-in';
import { useAuthActions } from '@/store/authStorage';
import { signUp } from '@/api/sign-up';

export const useSignUp = () => {
  const { setAuth } = useAuthActions();
  return useMutation({
    mutationKey: ['SIGN_UP'],
    mutationFn: async (params: SignInCredentials) => {
      return await signUp(params);
    },
    onSuccess: data => {
      setAuth({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      });
    },
    onError: (error: any) => {
      console.error('Sign in failed:', error);
    },
  });
};
