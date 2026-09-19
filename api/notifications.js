// api/notifications.js (mobile)
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { api } from "./client";

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") return null;

  const { data: pushToken } = await Notifications.getExpoPushTokenAsync();

  // send it to your backend to store against the user
  await api.post("/users/me/push-token", { pushToken });
  return pushToken;
}