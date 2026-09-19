import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import * as postsApi from "../../api/posts";
import * as authApi from "../../api/auth";

const TRUST_LEVELS = ["newcomer", "contributor", "trusted", "expert"];
const TRUST_LABELS = ["NEWCOMER", "CONTRIBUTOR", "TRUSTED", "EXPERT"];
const THRESHOLDS = [0, 100, 1000, 5000];

function progressFor(karma) {
  const idx = TRUST_LEVELS.findIndex(
    (_, i) => karma >= THRESHOLDS[i] && (i === 3 || karma < THRESHOLDS[i + 1])
  );
  const level = Math.max(idx, 0);
  const floor = THRESHOLDS[level];
  const ceiling = THRESHOLDS[level + 1] ?? floor + 5000;
  const pct = level === 3 ? 1 : Math.min(1, (karma - floor) / (ceiling - floor));
  return { level, pct };
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [karma, setKarma] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      Promise.all([postsApi.getMyProfile(), postsApi.getMyKarma()])
        .then(([p, k]) => {
          if (active) {
            setProfile(p);
            setKarma(k);
          }
        })
        .catch(() => {})
        .finally(() => active && setLoading(false));
      return () => {
        active = false;
      };
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Sign out?", "You'll need your email and password to sign back in.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await authApi.logout();
          router.replace("/");
        },
      },
    ]);
  };

  if (loading || !profile) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#adc6ff" />
      </SafeAreaView>
    );
  }

  const { level, pct } = progressFor(profile.karma);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
          <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} className="w-9 h-9 rounded-full bg-surface-high items-center justify-center">
          <Ionicons name="log-out-outline" size={18} color="#8c909f" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-2">
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="lock-closed-outline" size={16} color="#8c909f" />
              <Text className="text-outline text-base">{profile.anonId.slice(0, 16)}</Text>
            </View>
            <Text className="text-on-surface-variant text-sm leading-relaxed">
              Your identity remains hidden. These verified statistics establish your credibility.
            </Text>
          </View>

          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">Trust Level:</Text>
              <Text className="text-primary text-xs font-semibold">{TRUST_LABELS[level]}</Text>
            </View>
            <View className="h-2 bg-surface-high rounded-full mb-2 overflow-hidden">
              <LinearGradient
                colors={["#4d8eff", "#adc6ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: `${pct * 100}%`, height: "100%", borderRadius: 99 }}
              />
            </View>
            <View className="flex-row justify-between">
              {TRUST_LABELS.map((lvl, i) => (
                <Text key={lvl} className={`text-xs ${i <= level ? "text-primary" : "text-outline"}`} style={{ fontSize: 9 }}>
                  {lvl}
                </Text>
              ))}
            </View>
          </View>

          <LinearGradient colors={["#1a2744", "#0e1a35"]} className="rounded-xl p-5 mb-4 border border-primary/20">
            <Text className="text-primary text-xs font-medium tracking-widest uppercase text-center mb-1">
              Karma Score
            </Text>
            <View className="flex-row items-center justify-center gap-2 mb-2">
              <Text className="text-on-surface text-5xl font-bold">{profile.karma}</Text>
              <Ionicons name="trending-up" size={22} color="#4ade80" />
            </View>
          </LinearGradient>

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-surface-low border border-outline-variant/50 rounded-xl p-3 items-center">
              <Text className="text-on-surface text-2xl font-semibold">{profile.postCount}</Text>
              <Text className="text-outline text-xs mt-0.5">Posts</Text>
            </View>
            <View className="flex-1 bg-surface-low border border-outline-variant/50 rounded-xl p-3 items-center">
              <Text className="text-on-surface text-2xl font-semibold">{profile.replyCount}</Text>
              <Text className="text-outline text-xs mt-0.5">Replies</Text>
            </View>
          </View>

          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="shield-checkmark-outline" size={14} color="#8c909f" />
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">
                {profile.industryVerified ? "Verified Industry" : "Industry (self-declared)"}
              </Text>
            </View>
            <Text className="text-on-surface text-base font-medium">
              {profile.jobTitle} · {profile.industry}
            </Text>
          </View>

          <View className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 mb-8">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="time-outline" size={14} color="#8c909f" />
              <Text className="text-outline text-xs font-medium tracking-widest uppercase">Experience</Text>
            </View>
            <Text className="text-on-surface text-base font-medium">{profile.experienceYears}+ years</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
