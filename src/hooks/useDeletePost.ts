import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/api/deletePost';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['DELETE_POST'],
    mutationFn: async (id: string) => {
      return await deletePost(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
    },
    onError: (error: any) => {
      console.error('Delete post failed:', error);
    },
  });
};
