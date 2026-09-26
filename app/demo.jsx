import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 1. Tell Expo how to handle notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 2. Register for push notifications and set the token
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // 3. Listen for notifications received while the app is open (foreground)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 4. Listen for when a user taps/interacts with a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User tapped on notification:', response);
    });

    return () => {
      // Cleanup listeners on unmount
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notification Setup</Text>
      
      <View style={styles.tokenContainer}>
        <Text style={styles.boldText}>Your Expo Push Token:</Text>
        <Text selectable style={styles.tokenText}>{expoPushToken || "Fetching token..."}</Text>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.boldText}>Latest Notification:</Text>
        <Text>Title: {notification?.request.content.title}</Text>
        <Text>Body: {notification?.request.content.body}</Text>
        <Text>Data: {notification ? JSON.stringify(notification.request.content.data) : ''}</Text>
      </View>

      <Button
        title="Send a Test Local Notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

// Helper Function: Schedule a local notification
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello there! 👋",
      body: "This is a local push notification test.",
      data: { data: 'goes here' },
    },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2, 
    },
  });
}

// Helper Function: Request permissions and get the Expo push token
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    // Get the Project ID for the token
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      
    if (!projectId) {
      // Fallback for testing without an EAS project setup
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    }
    console.log(token);
  } else {
    alert('Must use a physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tokenContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tokenText: {
    textAlign: 'center',
    color: '#555',
  },
  notificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
  },
});