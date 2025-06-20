import { Stack } from 'expo-router';

export default function SurveyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="fitness-goals" />
      <Stack.Screen name="fitness-level" />
      <Stack.Screen name="workout-frequency" />
      <Stack.Screen name="workout-types" />
      <Stack.Screen name="limitations" />
      <Stack.Screen name="equipment" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}