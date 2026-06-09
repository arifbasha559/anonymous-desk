import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RECENT_ACTIVITY } from "../../data/mockData";

const TRUST_LEVELS = ["NEWCOMER", "CONTRIBUTOR", "TRUSTED", "EXPERT"];
const CURRENT_LEVEL = 1; // 0-indexed, CONTRIBUTOR
const PROGRESS = 0.75;

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
          <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
        </View>
        <TouchableOpacity className="w-9 h-9 rounded-full bg-surface-high items-center justify-center">
          <Ionicons name="settings-outline" size={18} color="#8c909f" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-2">

          {/* Confidential Profile header */}
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="lock-closed-outline" size={16} color="#8c909f" />
              <Text className="text-outline text-base">User #8291</Text>
            </View>
            <Text className="text-on-surface-variant text-sm leading-relaxed">
              Your identity remains hidden. These verified statistics establish your credibility
              within the network.
            </Text>
          </View>

          {/* Trust level bar */}
          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">
                Trust Level:
              </Text>
              <Text className="text-primary text-xs font-semibold">
                {TRUST_LEVELS[CURRENT_LEVEL]}
              </Text>
            </View>
            {/* Progress bar */}
            <View className="h-2 bg-surface-high rounded-full mb-2 overflow-hidden">
              <LinearGradient
                colors={["#4d8eff", "#adc6ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: `${PROGRESS * 100}%`, height: "100%", borderRadius: 99 }}
              />
            </View>
            {/* Level labels */}
            <View className="flex-row justify-between">
              {TRUST_LEVELS.map((lvl, i) => (
                <Text
                  key={lvl}
                  className={`text-xs ${i <= CURRENT_LEVEL ? "text-primary" : "text-outline"}`}
                  style={{ fontSize: 9 }}
                >
                  {lvl}
                </Text>
              ))}
            </View>
          </View>

          {/* Karma score */}
          <LinearGradient
            colors={["#1a2744", "#0e1a35"]}
            className="rounded-xl p-5 mb-4 border border-primary/20"
          >
            <Text className="text-primary text-xs font-medium tracking-widest uppercase text-center mb-1">
              Karma Score
            </Text>
            <View className="flex-row items-center justify-center gap-2 mb-2">
              <Text className="text-on-surface text-5xl font-bold">4,820</Text>
              <Ionicons name="trending-up" size={22} color="#4ade80" />
            </View>
            <View className="flex-row items-center justify-center gap-1.5 bg-primary/10 rounded-full px-3 py-1 self-center mb-2">
              <Ionicons name="trophy-outline" size={12} color="#adc6ff" />
              <Text className="text-primary text-xs font-medium">Top 5% Contributor</Text>
            </View>
            <Text className="text-on-surface-variant text-xs text-center leading-relaxed">
              Highly trusted peer based on community upvotes and accepted advice.
            </Text>
          </LinearGradient>

          {/* Stats row */}
          <View className="flex-row gap-3 mb-4">
            {[
              { label: "Posts", value: "12" },
              { label: "Replies", value: "48" },
              { label: "Helpful", value: "312" },
            ].map((s) => (
              <View
                key={s.label}
                className="flex-1 bg-surface-low border border-outline-variant/50 rounded-xl p-3 items-center"
              >
                <Text className="text-on-surface text-2xl font-semibold">{s.value}</Text>
                <Text className="text-outline text-xs mt-0.5">{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Industry */}
          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="shield-checkmark-outline" size={14} color="#8c909f" />
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">
                Verified Industry
              </Text>
            </View>
            <Text className="text-on-surface text-base font-medium">Technology / SaaS</Text>
          </View>

          {/* Experience */}
          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="time-outline" size={14} color="#8c909f" />
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">
                Experience Level
              </Text>
            </View>
            <Text className="text-on-surface text-base font-medium">10+ years</Text>
          </View>

          {/* Recent activity */}
          <Text className="text-outline text-xs font-medium tracking-widest uppercase mb-3">
            Recent Activity
          </Text>
          <View className="gap-2 mb-8">
            {RECENT_ACTIVITY.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-surface-low border border-outline-variant/50 rounded-xl px-4 py-3 flex-row items-center gap-3"
                activeOpacity={0.7}
              >
                <View className="w-8 h-8 rounded-full bg-surface-high items-center justify-center">
                  <Ionicons name={item.icon} size={16} color="#8c909f" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface text-sm">{item.text}</Text>
                  <Text className="text-outline text-xs mt-0.5">{item.timeAgo}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={14} color="#424754" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
