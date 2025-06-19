import { useEffect } from 'react';
import { Stack, Redirect, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// This function ensures authentication is required for all routes except auth routes
function ProtectedLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
      // If there's no session and we're not in the auth group, redirect to login
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      // If there is a session and we're in the auth group, redirect to home
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  // Show nothing while loading
  if (loading) {
    return null;
  }

  // If we're not in the auth group and have no session, redirect to login
  if (!session && segments[0] !== 'auth') {
    return <Redirect href="/auth/login" />;
  }

  // If we're in the auth group and have a session, redirect to home
  if (session && segments[0] === 'auth') {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  useFrameworkReady();

  const [loaded] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <ProtectedLayout />
      <StatusBar style="light" />
    </AuthProvider>
  );
}