import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenContainer, InputField, PrimaryButton } from "../../components/auth";
import { useState } from "react";

const SignUpScreen = () => {
    const router = useRouter();
  const [sector, setSector] = useState('Select your sector');
  const sectors = ['Technology', 'Finance', 'Healthcare', 'Legal', 'Consulting', 'other'];
  const handleSubmit = () => {
    if (sector === 'Select your sector') {
      alert('Please select your industry sector for vetting.');
      return;
    }
    router.push('(tabs)/');
}
  return (
    <ScreenContainer>
      <View className="items-center mb-8">
        <MaterialCommunityIcons name="hexagon-outline" size={48} color="#3B82F6" />
        <Text className="text-white text-2xl font-bold mt-4">Request Membership</Text>
        <Text className="text-slate-400 text-center mt-2 px-4 leading-5">
          Join an exclusive network of high-level professionals sharing secure, anonymous insights.
        </Text>
      </View>

      <InputField
        label="Full Name (Encrypted)"
        placeholder="John Doe"
        rightIcon={<Text className="text-slate-500 text-xs">🔒 AES-256</Text>}
      />
      <InputField
        label="Work Email (Verified)"
        placeholder="name@corporate.com"
        rightIcon={<Ionicons name="checkmark-circle" size={16} color="#475569" />}
      />

      <View className="mb-6">
        <Text className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">Industry Sector</Text>
        <View className="bg-[#121216] border border-slate-800 rounded-lg overflow-hidden">
          {sectors.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSector(s)}
              className={`flex-row items-center justify-between px-4 py-3 border-b border-slate-800/50 ${sector === s ? 'bg-blue-500/10' : ''}`}
            >
              <Text className={`${sector === s ? 'text-blue-400' : 'text-white'} text-base`}>{s}</Text>
              {sector === s && <Ionicons name="checkmark" size={18} color="#60A5FA" />}
            </TouchableOpacity>
          ))}
        </View>
        {sector === 'Select your sector' && <Text className="text-slate-500 text-[10px] mt-1 ml-1 italic">* Required for vetting</Text>}
      </View>

      <View className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
        <View className="flex-row items-center mb-2">
          <Ionicons name="information-circle-outline" size={18} color="#F59E0B" />
          <Text className="text-amber-500 font-semibold ml-2">Vetting Process</Text>
        </View>
        <Text className="text-slate-300 text-sm leading-5">
          To maintain the integrity of the club, every application is reviewed by our board. Approval typically takes 24-48 hours.
        </Text>
      </View>

      <PrimaryButton title="Submit Application" onPress={handleSubmit} />

      <TouchableOpacity className="mt-8 items-center" onPress={() => router.push('sign-in')}>
        <Text className="text-slate-400">Already a member? <Text className="text-amber-500 font-bold">Sign In →</Text></Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};
export default SignUpScreen;