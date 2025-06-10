import { api } from '@/lib/apiClient';
import { normalizeResponse } from '@/utils/normalize';

export type LogoutResponse = {};

export const logOut = async (): Promise<LogoutResponse> => {
  try {
    const response = await api.post<LogoutResponse>('/auth/log-out');

    console.log('Log out response:', normalizeResponse(response));

    return normalizeResponse(response);
  } catch (error) {
    console.error('Log out failed:', error);
    throw error;
  }
};
