import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import * as postsApi from "../../api/posts";

const CATEGORY_FILTERS = ["All", "Management", "Salary", "Ethics", "Burnout", "Legal"];

const CATEGORY_STYLES = {
  Tech: { bg: "#1a2744", text: "#5b9cf6" },
  Legal: { bg: "#1e1a2e", text: "#a78bfa" },
  Finance: { bg: "#2a1a1a", text: "#f87171" },
  Healthcare: { bg: "#1a2a1a", text: "#4ade80" },
  Management: { bg: "#2a1f0a", text: "#fbbf24" },
};

function PostCard({ post, onPress }) {
  const categoryName = post.category?.name || "General";
  const catStyle = CATEGORY_STYLES[categoryName] || { bg: "#1a2744", text: "#adc6ff" };
  const timeAgo = new Date(post.createdAt).toLocaleDateString();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-surface-low border border-outline-variant/50 rounded-xl mx-5 mb-3 p-4"
      activeOpacity={0.75}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: catStyle.bg }}>
          <Text className="text-xs font-medium" style={{ color: catStyle.text }}>
            {categoryName}
          </Text>
        </View>
        <Text className="text-outline text-xs">{timeAgo}</Text>
      </View>

      <Text className="text-on-surface text-base font-medium leading-snug mb-3">{post.title}</Text>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="arrow-up-outline" size={14} color="#8c909f" />
          <Text className="text-outline text-xs">{post.upvoteCount}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="chatbubble-outline" size={13} color="#8c909f" />
          <Text className="text-outline text-xs">{post.replyCount} replies</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeFeed() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async (filter) => {
    try {
      setError(null);
      const result = await postsApi.listPosts({
        tag: filter && filter !== "All" ? filter : undefined,
        sort: "recent",
      });
      setPosts(result || []);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchPosts(activeFilter).finally(() => setLoading(false));
    }, [activeFilter])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(activeFilter);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
          <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile")}
          className="w-9 h-9 rounded-full bg-surface-high items-center justify-center"
        >
          <Ionicons name="person-outline" size={18} color="#8c909f" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#adc6ff" />}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 mb-4">
          <View className="flex-row gap-2">
            {CATEGORY_FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full border ${
                  activeFilter === f ? "bg-primary border-primary" : "bg-transparent border-outline-variant"
                }`}
              >
                <Text className={`text-xs font-medium ${activeFilter === f ? "text-on-primary" : "text-outline"}`}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {loading ? (
          <View className="items-center py-12">
            <ActivityIndicator color="#adc6ff" />
          </View>
        ) : error ? (
          <View className="items-center py-12 px-8">
            <Ionicons name="cloud-offline-outline" size={32} color="#424754" />
            <Text className="text-outline text-sm mt-2 text-center">{error}</Text>
            <TouchableOpacity onPress={() => fetchPosts(activeFilter)} className="mt-3 px-4 py-2 bg-surface-high rounded-lg">
              <Text className="text-primary text-sm">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : posts.length === 0 ? (
          <View className="items-center py-12">
            <Ionicons name="document-text-outline" size={32} color="#424754" />
            <Text className="text-outline text-sm mt-2">No posts yet — be the first to share.</Text>
          </View>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onPress={() => router.push(`/post/${post.id}`)} />
          ))
        )}

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
