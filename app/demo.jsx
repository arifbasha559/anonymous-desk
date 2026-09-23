import { View, Text } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'
export default function demo() {
  const func = async () => {
    console.log("registering for push notifications")
    const { data: pushToken } = await Notifications.getExpoPushTokenAsync();
    console.log("Expo push token:", pushToken);
  }
  func()
  return (
    <View>
      <Text>demo</Text>
    </View>
  )
}