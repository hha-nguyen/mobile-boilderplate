import { useMutation } from '@tanstack/react-query';
import { useAuthActions } from '@/store/authStorage';
import { logOut } from '@/api/log-out';

export const useLogOut = () => {
  const { setAuth } = useAuthActions();
  return useMutation({
    mutationKey: ['LOG_OUT'],
    mutationFn: async () => {
      return await logOut();
    },
    onSuccess: data => {
      setAuth({
        accessToken: null,
        refreshToken: null,
        user: null,
      });
    },
    onError: (error: any) => {
      console.error('Sign in failed:', error);
    },
  });
};
