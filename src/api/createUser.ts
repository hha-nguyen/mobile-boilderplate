import { api } from '@/lib/apiClient';
import { normalizeResponse } from '@/utils/normalize';
import { User, UserParams } from '@/types/user';

export const createUser = async (userParams: UserParams): Promise<User> => {
  try {
    const response = await api.post<User>('/users', userParams);

    console.log('Create user response:', normalizeResponse(response));

    return normalizeResponse(response);
  } catch (error) {
    console.error('Create user failed:', error);
    throw error;
  }
};
