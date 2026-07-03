import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

function TabIcon({ name, focused, label }) {
  return (
    <View className="items-center justify-center pt-1 ">
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={focused ? "#adc6ff" : "#8c909f"}
      />
      <Text
        className={` flex-nowrap break-words mt-0.5 ${focused ? "text-primary font-medium" : "text-outline"}`}
        numberOfLines={1}
        ellipsizeMode="clip"
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
          height: 80,
          paddingBottom: 20,

        },
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarInactiveTintColor: "#8c909f",
        tabBarActiveTintColor: "#adc6ff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={focused ? "#adc6ff" : "#8c909f"}
            />
          ),

        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={22}
              color={focused ? "#adc6ff" : "#8c909f"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={focused ? "#adc6ff" : "#8c909f"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
