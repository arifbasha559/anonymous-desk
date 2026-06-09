import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { POSTS, TRENDING_TOPICS } from "../../data/mockData";

const CATEGORY_FILTERS = ["All", "Management", "Salary", "Ethics", "Burnout", "Legal"];

const CATEGORY_STYLES = {
  Tech: { bg: "#1a2744", text: "#5b9cf6" },
  Legal: { bg: "#1e1a2e", text: "#a78bfa" },
  Finance: { bg: "#2a1a1a", text: "#f87171" },
  Healthcare: { bg: "#1a2a1a", text: "#4ade80" },
  Management: { bg: "#2a1f0a", text: "#fbbf24" },
};

function PostCard({ post, onPress }) {
  const catStyle = CATEGORY_STYLES[post.category] || { bg: "#1a2744", text: "#adc6ff" };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-surface-low border border-outline-variant/50 rounded-xl mx-5 mb-3 p-4"
      activeOpacity={0.75}
    >
      {/* Reading indicator */}
      {post.readingNow && (
        <View className="flex-row items-center gap-1.5 mb-3">
          <View className="w-2 h-2 rounded-full bg-green-400" />
          <Text className="text-green-400 text-xs">{post.readingNow} people reading this now</Text>
        </View>
      )}

      {/* Category + time */}
      <View className="flex-row items-center justify-between mb-2">
        <View
          className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ backgroundColor: catStyle.bg }}
        >
          <Ionicons name={post.categoryIcon} size={12} color={catStyle.text} />
          <Text className="text-xs font-medium" style={{ color: catStyle.text }}>
            {post.category}
          </Text>
        </View>
        <Text className="text-outline text-xs">{post.timeAgo}</Text>
      </View>

      {/* Title */}
      <Text className="text-on-surface text-base font-medium leading-snug mb-3">
        {post.title}
      </Text>

      {/* Footer */}
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="arrow-up-outline" size={14} color="#8c909f" />
          {post.isHot && <Ionicons name="flame" size={13} color="#f97316" />}
          <Text className="text-outline text-xs">{post.upvotes}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="chatbubble-outline" size={13} color="#8c909f" />
          <Text className="text-outline text-xs">{post.replies} replies</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeFeed() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? POSTS
      : POSTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <SafeAreaView className="flex-1  bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
          <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/')} className="w-9 h-9 rounded-full bg-surface-high items-center justify-center">
          <Ionicons name="person-outline" size={18} color="#8c909f" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
        {/* Trending topics */}
        <View className="mt-2 mb-2">
          <Text className="text-outline text-xs font-medium tracking-widest uppercase px-5 mb-2">
            Trending Topics
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=""
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 5 }}>
            <View className="flex-row gap-2">
              {TRENDING_TOPICS.map((t) => (
                <TouchableOpacity
                  key={t}
                  className="bg-surface-high border border-outline-variant/50 px-3 py-1.5 rounded-full"
                >
                  <Text className="text-on-surface-variant text-xs font-medium">{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Verified badge */}
        <View className="flex-row items-center gap-1.5 px-5 mb-2 ">
          <Ionicons name="shield-checkmark-outline" size={13} color="#8c909f" />
          <Text className="text-outline text-xs tracking-widest uppercase font-medium">
            Verified Anonymous Network
          </Text>
        </View>

        {/* Category filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 5 }} className=" mb-4">
          <View className="flex-row gap-2">
            {CATEGORY_FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full border ${activeFilter === f
                  ? "bg-primary border-primary"
                  : "bg-transparent border-outline-variant"
                  }`}
              >
                <Text
                  className={`text-xs font-medium ${activeFilter === f ? "text-on-primary" : "text-outline"
                    }`}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Posts */}
        {filtered.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPress={() => router.push(`/post/${post.id}`)}
          />
        ))}

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
