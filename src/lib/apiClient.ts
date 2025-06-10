import axios, { AxiosError, AxiosHeaders, AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { useAuthStore } from '@/store/authStorage';
import { normalizeResponse } from '@/utils/normalize';

type ErrorResponse = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

console.log(
  'Creating API client with base URL:',
  process.env.EXPO_PUBLIC_BASE_URL
);

export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': Platform.OS,
      'X-App-Version': '1.0.0',
    },
  });

  client.interceptors.request.use(async config => {
    const token = useAuthStore.getState().accessToken;
    const deviceId = await getUniqueId();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (deviceId) {
      config.headers['X-Device-Id'] = deviceId;
    }

    return config;
  });

  client.interceptors.response.use(
    response => normalizeResponse(response),
    async (error: AxiosError<ErrorResponse>) => {
      if (!error.response) {
        return Promise.reject({
          message: 'Network error. Please check your internet connection.',
          status: 0,
        });
      }

      const { status, data } = error.response;

      if (status === 401) {
        // Token expired, try refresh flow
        const refreshed = await handleTokenRefresh();
        if (refreshed) {
          // Retry original request
          const originalRequest = error.config!;
          const newToken = useAuthStore.getState().accessToken;

          // Create a new AxiosHeaders instance or update headers correctly
          originalRequest.headers = new AxiosHeaders({
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          });

          return client(originalRequest);
        } else {
          // Logout
          useAuthStore.getState().actions.clearAuth();
        }
      }

      return Promise.reject(
        normalizeResponse({
          message: data?.message || 'An error occurred',
          status,
          errors: data?.errors,
        })
      );
    }
  );

  return client;
};

const handleTokenRefresh = async (): Promise<boolean> => {
  const { refreshToken, actions } = useAuthStore.getState();
  if (!refreshToken) return false;

  console.log('Attempting to refresh token with:', refreshToken);

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/auth/refresh`,
      {
        refresh_token: refreshToken,
      }
    );

    const {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      user,
    } = response.data;

    console.log('Token refresh successful:', newAccessToken, newRefreshToken);

    actions.setAuth({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    });
    return true;
  } catch (e) {
    return false;
  }
};

// Instantiate once and export
export const api = createApiClient();
