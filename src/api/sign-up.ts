import { api } from '@/lib/apiClient';
import { normalizeResponse } from '@/utils/normalize';

export type SignUpCredentials = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  session: {
    access_token: string;
    refresh_token: string;
  };
  user: {
    id: string;
    email: string;
  };
};

export const signUp = async ({
  email,
  password,
}: SignUpCredentials): Promise<SignUpResponse> => {
  try {
    const response = await api.post<SignUpResponse>('/auth/sign-up', {
      email,
      password,
    });

    console.log('Sign-up response:', normalizeResponse(response));

    return normalizeResponse(response);
  } catch (error) {
    console.error('Sign up failed:', error);
    throw error;
  }
};
