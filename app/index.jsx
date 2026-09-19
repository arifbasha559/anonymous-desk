import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as authApi from "../api/auth";
import { ApiError } from "../api/client";

const INDUSTRIES = ["Tech", "Legal", "Finance", "Healthcare", "Management", "HR", "Other"];

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExp, setYearsExp] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing details", "Email and password are required.");
      return;
    }
    if (mode === "register" && (!jobTitle || !yearsExp)) {
      Alert.alert("Missing details", "Please fill in your job title and years of experience.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        await authApi.register({
          email,
          password,
          industry,
          jobTitle,
          yearsExp: Number(yearsExp),
        });
      } else {
        const data=await fetch("http://10.51.227.242:4000/api/v1")
        console.log(data.json())
        await authApi.login({ email, password });
      }
      router.replace("/(tabs)");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      Alert.alert(mode === "register" ? "Registration failed" : "Login failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <LinearGradient
        colors={["#131313", "#0e1a35", "#131313"]}
        style={{ flex: 1 }}
        locations={[0, 0.5, 1]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View className="items-center mt-14 mb-6">
              <View className="flex-row items-center gap-2 bg-surface-high border border-outline-variant px-4 py-2 rounded-full">
                <Ionicons name="lock-closed" size={12} color="#adc6ff" />
                <Text className="text-primary text-xs font-medium tracking-widest uppercase">
                  Confidential Network
                </Text>
              </View>
            </View>

            <View className="items-center justify-center mb-8">
              <LinearGradient
                colors={["#1a2a4a", "#0e1a35"]}
                className="rounded-full items-center justify-center"
                style={{ width: 84, height: 84 }}
              >
                <Ionicons name="shield-checkmark" size={42} color="#adc6ff" />
              </LinearGradient>
            </View>

            <View className="px-8 mb-8">
              <Text className="text-on-surface text-3xl font-semibold text-center leading-tight mb-2">
                {mode === "login" ? "Welcome back" : "Join AnonymousDesk"}
              </Text>
              <Text className="text-on-surface-variant text-sm text-center leading-relaxed">
                {mode === "login"
                  ? "Sign in with your email and password."
                  : "Your identity is derived from your credentials — nothing personal is ever stored."}
              </Text>
            </View>

            <View className="px-6 gap-3">
              <View className="bg-surface-high border border-outline-variant rounded-xl px-4 py-3">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#5f5e5a"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-on-surface text-base"
                />
              </View>
              <View className="bg-surface-high border border-outline-variant rounded-xl px-4 py-3">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#5f5e5a"
                  secureTextEntry
                  className="text-on-surface text-base"
                />
              </View>

              {mode === "register" && (
                <>
                  <Text className="text-outline text-xs font-medium tracking-widest uppercase mt-2">
                    Industry
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <TouchableOpacity
                        key={ind}
                        onPress={() => setIndustry(ind)}
                        className={`px-3 py-2 rounded-lg border ${
                          industry === ind
                            ? "border-primary bg-primary/10"
                            : "border-outline-variant"
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            industry === ind ? "text-primary font-medium" : "text-on-surface-variant"
                          }`}
                        >
                          {ind}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View className="bg-surface-high border border-outline-variant rounded-xl px-4 py-3 mt-1">
                    <TextInput
                      value={jobTitle}
                      onChangeText={setJobTitle}
                      placeholder="Job title (e.g. Software Engineer)"
                      placeholderTextColor="#5f5e5a"
                      className="text-on-surface text-base"
                    />
                  </View>
                  <View className="bg-surface-high border border-outline-variant rounded-xl px-4 py-3">
                    <TextInput
                      value={yearsExp}
                      onChangeText={setYearsExp}
                      placeholder="Years of experience"
                      placeholderTextColor="#5f5e5a"
                      keyboardType="number-pad"
                      className="text-on-surface text-base"
                    />
                  </View>
                </>
              )}
            </View>

            <View className="px-6 gap-3 mt-6 mb-8">
              <TouchableOpacity onPress={handleSubmit} disabled={loading} className="rounded-xl overflow-hidden">
                <LinearGradient
                  colors={["#4d8eff", "#3b6cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="flex-row items-center justify-center gap-2 py-4"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
                      <Text className="text-white text-base font-semibold">
                        {mode === "login" ? "Sign In" : "Create Account"}
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMode(mode === "login" ? "register" : "login")}
                className="items-center py-3"
              >
                <Text className="text-on-surface-variant text-sm">
                  {mode === "login" ? "New here? " : "Already a member? "}
                  <Text className="text-primary font-medium">
                    {mode === "login" ? "Create an account" : "Sign in"}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
