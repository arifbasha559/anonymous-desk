import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>

        <StatusBar style="light" backgroundColor="#131313" />
        <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="post/[id]" />
          
        </Stack>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
