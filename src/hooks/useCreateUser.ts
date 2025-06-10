import { useMutation } from '@tanstack/react-query';
import { UserParams } from '@/types/user';
import { createUser } from '@/api/createUser';

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['CREATE_USER'],
    mutationFn: async (params: UserParams) => {
      return await createUser(params);
    },
    onError: (error: any) => {
      console.error('Create user failed:', error);
    },
  });
};
