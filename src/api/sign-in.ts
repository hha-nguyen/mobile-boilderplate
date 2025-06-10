import {api} from '@/lib/apiClient';
import {normalizeResponse} from "@/utils/normalize";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInResponse = {
    session: {
      access_token: string;
      refresh_token: string;
    }
    user: {
      id: string;
      email: string;
      // Add other user fields as needed
    };
};

export const signIn = async ({ email, password }: SignInCredentials): Promise<SignInResponse> => {
  try {
    const response = await api.post<SignInResponse>('/auth/sign-in', {
      email,
      password,
    });

    console.log('Sign-in response:', normalizeResponse(response));

    return normalizeResponse(response);
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
};
