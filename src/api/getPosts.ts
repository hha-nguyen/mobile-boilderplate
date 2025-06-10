import { api } from '@/lib/apiClient';
import { normalizeResponse } from '@/utils/normalize';
import { Post } from '@/types/post';

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');

  console.log('Get post response:', normalizeResponse(response));

  return normalizeResponse(response);
};
