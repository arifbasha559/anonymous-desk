import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotifications } from "../api/notifications";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    (async function register() {
      try {
        await registerForPushNotifications();
      } catch (err) {
        // ignore registration failures for now
        console.warn("Push registration failed:", err);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#131313" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#131313" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}
