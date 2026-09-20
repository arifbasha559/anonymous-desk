// api/notifications.js (mobile)
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import { api } from "./client";

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.warn("Push not supported on simulator/emulator (Device.isDevice=false)");
    return null;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.warn("Push permissions not granted");
    return null;
  }

  const { data: pushToken } = await Notifications.getExpoPushTokenAsync();
  console.log("Expo push token:", pushToken);

  try {
    const res = await api.post("/users/me/push-token", { pushToken });
    console.log("Saved push token to backend:", res);
    await SecureStore.setItemAsync("ad_push_token", pushToken);
  } catch (err) {
    console.warn("Failed to send push token to backend:", err);
    await SecureStore.setItemAsync("ad_push_token", pushToken);
  }

  return pushToken;
}