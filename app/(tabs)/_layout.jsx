import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TabIcon({ name, focused, label }) {
  return (
    <View className="items-center justify-center pt-1">
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={focused ? "#adc6ff" : "#8c909f"}
      />
      <Text
        className={`text-xs mt-0.5 ${focused ? "text-primary font-medium" : "text-outline"}`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1c1b1b",
          borderTopColor: "#424754",
          borderTopWidth: 0.5,
          height: 60,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="add-circle" focused={focused} label="Create" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person" focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
