import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const FEATURES = [
  {
    icon: "shield-checkmark-outline",
    label: "100% Anonymous",
    desc: "Your identity is never revealed",
  },
  {
    icon: "people-outline",
    label: "Industry Verified",
    desc: "Advice from real professionals",
  },
  {
    icon: "bulb-outline",
    label: "Expert Advice",
    desc: "Top replies from verified experts",
  },
];

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <LinearGradient
        colors={["#131313", "#0e1a35", "#131313"]}
        style={{ flex: 1 }}
        locations={[0, 0.5, 1]}
      >
        {/* Top badge */}
        <View className="items-center mt-16 mb-8">
          <View className="flex-row items-center gap-2 bg-surface-high border border-outline-variant px-4 py-2 rounded-full">
            <Ionicons name="lock-closed" size={12} color="#adc6ff" />
            <Text className="text-primary text-xs font-medium tracking-widest uppercase">
              Confidential Network
            </Text>
          </View>
        </View>

        {/* Central shield illustration */}
        <View className="items-center justify-center mb-10">
          <View
            style={{ width: 140, height: 140 }}
            className="items-center justify-center"
          >
            {/* Outer glow ring */}
            <View
              className="absolute rounded-full border border-primary/20"
              style={{ width: 140, height: 140 }}
            />
            <View
              className="absolute rounded-full border border-primary/10"
              style={{ width: 120, height: 120 }}
            />
            {/* Core shield */}
            <LinearGradient
              colors={["#1a2a4a", "#0e1a35"]}
              style={{ width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center" }}
            >
              <View className="flex-1 rounded-full items-center justify-center">
                <Ionicons name="shield-checkmark" size={48} color="#adc6ff" />
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Headline */}
        <View className="px-8 mb-10">
          <Text className="text-on-surface text-4xl font-semibold text-center leading-tight mb-4">
            Your career.{"\n"}Your secrets.{"\n"}Safe here.
          </Text>
          <Text className="text-on-surface-variant text-base text-center leading-relaxed">
            A digital private members club designed for high-level professionals
            seeking confidential peer advice.
          </Text>
        </View>

        {/* Feature highlights */}
        <View className="px-6 mb-10 gap-3">
          {FEATURES.map((f) => (
            <View
              key={f.icon}
              className="flex-row items-center gap-4 bg-surface-container/50 border border-outline-variant/50 rounded-xl px-4 py-3"
            >
              <View className="bg-primary/10 rounded-lg p-2">
                <Ionicons name={f.icon} size={20} color="#adc6ff" />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface text-sm font-medium">
                  {f.label}
                </Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">
                  {f.desc}
                </Text>
              </View>
              <Ionicons name="checkmark-circle" size={18} color="#4ade80" />
            </View>
          ))}
        </View>

        {/* CTA */}
        <View className="px-6 gap-3 mt-auto mb-8">
          <TouchableOpacity
            onPress={() => router.push("/create")}
            className="overflow-hidden rounded-xl"
          >
            <LinearGradient
              colors={["#4d8eff", "#3b6cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View className="flex-row w-full items-center justify-center gap-2 py-4">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#fff"
                />
                <Text className="text-white text-base font-semibold">
                  Get Started
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="items-center py-3"
          >
            <Text className="text-on-surface-variant text-sm">
              Already a member?{" "}
              <Text className="text-primary font-medium">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

