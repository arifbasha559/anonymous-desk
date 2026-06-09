import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenContainer, PrimaryButton } from "../../components/auth";




const SecureVerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(59);
const router = useRouter();
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleChange = (text, idx) => {
    if (!/^[0-9]*$/.test(text)) return;
    const val = text.slice(-1);
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyPress = ({ nativeEvent }, idx) => {
    if (nativeEvent.key === 'Backspace' && code[idx] === '' && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const verify = () => {
    const joined = code.join('');
    if (joined.length < 6) {
      alert('Enter the full 6-digit code.');
      return;
    }
    // placeholder verification logic
    if (joined === '123456') {
      router.push('(tabs)/');
    } else {
      alert('Invalid code.');
    }
  };

  const resend = () => {
    setSecondsLeft(59);
    setCode(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
    alert('A new code has been sent to your device.');
  };

  return (
    <ScreenContainer>
      <View className="items-center mt-8 mb-10">
        <View className="bg-blue-500/10 p-6 rounded-full border border-blue-500/20">
          <Ionicons name="shield-half" size={48} color="#F59E0B" />
        </View>
        <Text className="text-white text-2xl font-bold mt-6">Identity Verification</Text>
        <View className="flex-row items-center bg-slate-800/50 rounded-full px-3 py-1 mt-2 mb-6">
          <Text className="text-slate-300 text-xs font-medium tracking-widest">END-TO-END ENCRYPTED</Text>
        </View>
        <Text className="text-slate-400 text-center px-6 leading-5">
          A one-time secure code has been sent to your verified device.
        </Text>
      </View>

      <View className="flex-row justify-between mb-8 px-2">
        {code.map((c, i) => (
          <View key={i} className="w-12 h-14">
            <TextInput
              ref={(el) => (inputs.current[i] = el)}
              value={c}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              className="bg-[#121216] border border-slate-700 w-12 h-14 rounded-lg text-white text-xl text-center"
            />
          </View>
        ))}
      </View>

      <PrimaryButton title="Verify & Enter" onPress={verify} />

      <TouchableOpacity className="items-center mt-8" onPress={secondsLeft <= 0 ? resend : undefined}>
        <View className="flex-row items-center">
          <Ionicons name="refresh" size={16} color="#F59E0B" />
          <Text className="text-amber-500 font-bold ml-2">RESEND CODE</Text>
        </View>
        <Text className="text-slate-500 text-xs mt-2">{secondsLeft > 0 ? `Available in 00:${secondsLeft.toString().padStart(2, '0')}` : 'Tap to resend'}</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-8 items-center" onPress={() => router.push('(tabs)/')}>
        <Text className="text-slate-400 text-sm">Cancel and return to <Text className="text-white">Sign In</Text></Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};
export default SecureVerificationScreen;