# AnonymousDesk — React Native Expo App

A confidential professional advice platform built with Expo + NativeWind.

## Tech Stack
- **Expo** ~51 with Expo Router (file-based navigation)
- **NativeWind** v4 (Tailwind CSS for React Native)
- **expo-linear-gradient** for gradient effects
- **@expo/vector-icons** (Ionicons)
- **react-native-safe-area-context**

## Project Structure
```
AnonymousDesk/
├── app/
│   ├── _layout.jsx          # Root layout
│   ├── index.jsx            # Onboarding screen
│   ├── (tabs)/
│   │   ├── _layout.jsx      # Tab bar
│   │   ├── index.jsx        # Home Feed
│   │   ├── create.jsx       # Create Post
│   │   └── profile.jsx      # Profile
│   └── post/
│       └── [id].jsx         # Post Detail
├── components/              # Shared components (extend here)
├── data/
│   └── mockData.js          # Mock posts, comments, activity
├── global.css               # Tailwind base
├── tailwind.config.js       # Design tokens from DESIGN.md
├── babel.config.js
└── metro.config.js
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npx expo start

# 3. Run on device
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR with Expo Go app on your phone
```

## Design Tokens (from Stitch DESIGN.md)
- **Background:** `#131313`
- **Surface:** `#1c1b1b`
- **Primary:** `#adc6ff` (Electric Blue)
- **Font:** Inter
- **Border radius:** 4px (default), 8px (cards), full (pills)

## Screens
| Screen | Route | Description |
|--------|-------|-------------|
| Onboarding | `/` | Welcome + get started |
| Home Feed | `/(tabs)` | Post cards with filters |
| Create Post | `/(tabs)/create` | Draft & submit dilemma |
| Profile | `/(tabs)/profile` | Karma, trust level, activity |
| Post Detail | `/post/[id]` | Full post + expert replies |

## Extending
- Replace `data/mockData.js` with real API calls
- Add auth with `expo-secure-store` for anonymous tokens
- Add push notifications with `expo-notifications`
- Add LinkedIn OAuth for industry verification
