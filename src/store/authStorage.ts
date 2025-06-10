import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import type { UseBoundStore } from 'zustand/react';
import type { StoreApi } from 'zustand/vanilla';
import { User } from '@/types/user';

// --- MMKV Setup ---
const mmkv = new MMKV({ id: 'auth-storage' });

const zustandStorage: StateStorage = {
  setItem: (name, value) => mmkv.set(name, value),
  getItem: name => mmkv.getString(name) ?? null,
  removeItem: name => mmkv.delete(name),
};

// --- Types ---
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  actions: {
    setAuth: (auth: {
      accessToken: string | null;
      refreshToken: string | null;
      user: User | null;
    }) => void;
    clearAuth: () => void;
  };
}

// --- Store ---
export const useAuthStore: UseBoundStore<StoreApi<AuthState>> = create(
  persist<
    AuthState,
    [],
    [],
    Pick<AuthState, 'accessToken' | 'refreshToken' | 'user'>
  >(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      actions: {
        setAuth: ({ accessToken, refreshToken, user }) =>
          set({ accessToken, refreshToken, user }),
        clearAuth: () =>
          set({ accessToken: null, refreshToken: null, user: null }),
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (
        state: AuthState
      ): Pick<AuthState, 'accessToken' | 'refreshToken' | 'user'> => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

// --- Hooks ---
export const useAuth = () =>
  useAuthStore(state => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    user: state.user,
  }));

export const useAuthActions = () => useAuthStore(state => state.actions);
