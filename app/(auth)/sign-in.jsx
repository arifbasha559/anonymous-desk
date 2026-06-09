import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenContainer, InputField, PrimaryButton } from "../../components/auth";

const SignInScreen = () => {
    const router = useRouter();
    return (
        <ScreenContainer>
            <View className="items-center mb-10">
                <MaterialCommunityIcons name="hexagon-multiple" size={56} color="#3B82F6" />
                <Text className="text-white text-2xl font-bold mt-4">AnonymousDesk</Text>
                <View className="flex-row items-center bg-slate-800/50 rounded-full px-3 py-1 mt-2">
                    <Ionicons name="shield" size={12} color="#94A3B8" />
                    <Text className="text-slate-300 text-xs ml-1 font-medium tracking-widest">END-TO-END ENCRYPTED</Text>
                </View>
            </View>

            <View className="bg-[#121216]/50 border border-slate-800/50 rounded-2xl p-6">
                <Text className="text-white text-xl font-bold mb-2">Secure Access</Text>
                <Text className="text-slate-400 text-sm mb-6">Enter your credentials to enter the private member's network.</Text>

                <InputField
                    label="Professional Email"
                    placeholder="name@company.com"
                />
                <InputField
                    label="Private Key"
                    placeholder="••••••••••••"
                    secureTextEntry
                    icon={<Ionicons name="key-outline" size={18} color="#475569" />}
                    rightIcon={<Ionicons name="eye-outline" size={18} color="#475569" />}
                />

                <PrimaryButton
                    title="Access Network"
                    icon={<Ionicons name="log-in-outline" size={20} color="white" />}
                    onPress={() => router.push('verification')}
                />

                <View className="items-center mt-6 space-y-4">
                    <TouchableOpacity onPress={() => router.push('Recover')}>
                        <Text className="text-slate-400 font-medium">Forgot Access Details?</Text>
                    </TouchableOpacity>

                    <Text className="text-slate-600 text-xs font-bold tracking-widest mt-6 mb-2">MEMBERSHIP</Text>

                    <TouchableOpacity onPress={() => router.push('sign-up')}>
                        <Text className="text-amber-500 font-bold">Request Membership</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer>
    );
}
export default SignInScreen;