import { api } from '@/lib/apiClient';
import { Post } from '@/types/post';
import { normalizeResponse } from '@/utils/normalize';

export const deletePost = async (id: string): Promise<Post> => {
  try {
    // Pass the ID as a query parameter in the URL
    const response = await api.delete<Post>(
      `/posts?id=${encodeURIComponent(id)}`
    );
    console.log('Delete posts response:', normalizeResponse(response));

    return normalizeResponse(response);
  } catch (error) {
    console.error('Delete post failed:', error);
    throw error;
  }
};
