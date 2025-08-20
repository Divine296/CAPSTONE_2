// src/app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Bottom tab navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Extra screens that should NOT appear in the tab bar */}
      <Stack.Screen name="(stack)" options={{ headerShown: false }} />
    </Stack>
  );
}
