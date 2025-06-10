import {useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import {QueryClientProvider} from '@tanstack/react-query';
import initI18n from '@/i18n/config';

import {useColorScheme} from '@/hooks/useColorScheme';
import {darkTheme, lightTheme} from '@/theme/colors';
import {ThemeProvider} from '@react-navigation/core';
import {queryClient} from '@/lib/react-query';
import {useAuthStore} from "@/store/authStorage";

initI18n();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'NunitoSans-Regular': require('../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Bold': require('../assets/fonts/NunitoSans-Bold.ttf'),
    'NunitoSans-SemiBold': require('../assets/fonts/NunitoSans-SemiBold.ttf'),
    'NunitoSans-Italic': require('../assets/fonts/NunitoSans-Italic.ttf'),
    'NunitoSans-BoldItalic': require('../assets/fonts/NunitoSans-BoldItalic.ttf'),
    'NunitoSans-SemiBoldItalic': require('../assets/fonts/NunitoSans-SemiBoldItalic.ttf'),
  });
  const { user } = useAuthStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (user) {
      setTimeout(() => router.replace('/(tabs)'), 100); // Add a slight delay
    } else {
      setTimeout(() => router.replace('/(auth)/login'), 100);
    }
  }, [user, router]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <Stack>
            <Stack.Screen
                name="(auth)"
                options={{ headerShown: false }}
            />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
