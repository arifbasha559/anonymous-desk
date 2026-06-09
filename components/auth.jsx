import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ==========================================
// REUSABLE UI COMPONENTS
// ==========================================

export const ScreenContainer = ({ children }) => (
  <SafeAreaView className="flex-1 bg-[#0A0A0C]">
    <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 40 }}>
      <View className="flex-row items-center mb-8">
        <Ionicons name="shield-checkmark" size={20} color="#60A5FA" />
        <Text className="text-white font-bold ml-2 text-lg tracking-widest">AnonymousDesk</Text>
      </View>
      {children}
    </ScrollView>
  </SafeAreaView>
);

export const InputField = ({ label, placeholder, secureTextEntry = false, icon, rightIcon }) => (
  <View className="mb-5">
    <Text className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">{label}</Text>
    <View className="flex-row items-center bg-[#121216] border border-slate-800 rounded-lg px-4 py-3">
      {icon && <View className="mr-3">{icon}</View>}
      <TextInput
        className="flex-1 text-white text-base"
        placeholder={placeholder}
        placeholderTextColor="#475569"
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <View className="ml-3">{rightIcon}</View>}
    </View>
  </View>
);

export const PrimaryButton = ({ title, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-blue-500 rounded-lg py-4 flex-row justify-center items-center mt-4 shadow-lg shadow-blue-500/20 active:bg-blue-600"
  >
    {icon && <View className="mr-2">{icon}</View>}
    <Text className="text-white font-bold text-base">{title}</Text>
  </TouchableOpacity>
);

// ==========================================
// SCREENS
// ==========================================







