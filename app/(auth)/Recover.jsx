import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenContainer, InputField, PrimaryButton } from "../../components/auth";


const RecoverAccessScreen = () => {
    const router = useRouter();
    return (

        <ScreenContainer>
            <View className="absolute top-6 right-6 z-10">
                <TouchableOpacity onPress={() => router.push('sign-in')}>
                    <Text className="text-slate-300 text-sm font-medium">Back to Sign In</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-12 mb-8">
                <Text className="text-white text-2xl font-bold mb-3">Recover Access</Text>
                <Text className="text-slate-400 text-base leading-6 pr-4">
                    Enter your verified professional email to receive a secure recovery link.
                </Text>
            </View>

            <InputField
                label="Professional Email"
                placeholder="name@company.com"
                icon={<Ionicons name="mail-outline" size={18} color="#475569" />}
            />

            <PrimaryButton title="Send Recovery Link →" onPress={() => alert("Recovery link sent securely.")} />

            <View className="bg-[#121216] border border-slate-800 rounded-lg p-5 mt-8">
                <View className="flex-row items-center mb-3">
                    <Ionicons name="shield-checkmark" size={18} color="#94A3B8" />
                    <Text className="text-slate-300 font-bold ml-2 text-xs tracking-wider">SECURITY PROTOCOL</Text>
                </View>
                <Text className="text-slate-400 text-sm leading-5">
                    AnonymousDesk staff will never ask for your recovery keys. Always ensure the URL matches <Text className="text-blue-400">anonymousdesk.com/secure</Text> before entering credentials.
                </Text>
            </View>
        </ScreenContainer>
    );
}
export default RecoverAccessScreen;