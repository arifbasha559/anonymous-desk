// firebaseConfig.js
import { getApps, initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const data = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'anonymous-2910f.firebaseapp.com',
  projectId: 'anonymous-2910f',
  storageBucket: 'anonymous-2910f.appspot.com',
  messagingSenderId: '473235470533',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseConfig = data;

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // ✅ Get existing app if already initialized
}

const messaging = getMessaging(app);

export { messaging };