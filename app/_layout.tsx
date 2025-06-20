import { useEffect } from 'react';
import { Stack, Redirect, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function ProtectedLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inSurveyGroup = segments[0] === 'survey';

    if (!session && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      router.replace('/survey/welcome');
    }
  }, [session, loading, segments]);

  if (loading) {
    return null;
  }

  if (!session && segments[0] !== 'auth') {
    return <Redirect href="/auth/login" />;
  }

  if (session && segments[0] === 'auth') {
    return <Redirect href="/survey/welcome" />;
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