import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import * as postsApi from "../../api/posts";
import { ApiError } from "../../api/client";

const CATEGORY_STYLES = {
  Tech: { bg: "#1a2744", text: "#5b9cf6" },
  Legal: { bg: "#1e1a2e", text: "#a78bfa" },
  Finance: { bg: "#2a1a1a", text: "#f87171" },
  Healthcare: { bg: "#1a2a1a", text: "#4ade80" },
  Management: { bg: "#2a1f0a", text: "#fbbf24" },
};

function ReplyCard({ reply, onHelpful, indent = false }) {
  const [helped, setHelped] = useState(false);
  const [helpCount, setHelpCount] = useState(reply.helpfulCount);

  const handleHelped = async () => {
    if (helped) return;
    try {
      const result = await onHelpful(reply.id);
      setHelpCount(result.helpfulCount);
      setHelped(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) setHelped(true);
    }
  };

  return (
    <View
      className={`rounded-xl p-4 mb-3 ${reply.isExpertReply ? "border-l-2" : "bg-surface-container border border-outline-variant/30"}`}
      style={reply.isExpertReply ? { borderLeftColor: "#f59e0b", backgroundColor: "#1c1b1b" } : {}}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2 flex-wrap">
          <Text className="text-primary text-xs font-medium">
            {reply.authorJobTitle} · {reply.authorYrsExp} yrs
          </Text>
          {reply.isExpertReply && (
            <View className="flex-row items-center gap-1 bg-amber-500/10 rounded-full px-2 py-0.5">
              <Ionicons name="shield-checkmark" size={10} color="#f59e0b" />
              <Text className="text-amber-400 text-xs font-semibold">VERIFIED EXPERT</Text>
            </View>
          )}
        </View>
      </View>

      <Text className="text-on-surface-variant text-sm leading-relaxed mb-3">{reply.body}</Text>

      <TouchableOpacity
        onPress={handleHelped}
        className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border self-start ${
          helped ? "border-green-500/50 bg-green-500/10" : "border-outline-variant"
        }`}
      >
        <Ionicons name={helped ? "thumbs-up" : "thumbs-up-outline"} size={12} color={helped ? "#4ade80" : "#8c909f"} />
        <Text className={`text-xs ${helped ? "text-green-400" : "text-outline"}`}>
          This helped me ({helpCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  const load = useCallback(async () => {
    try {
      const [postData, replyData] = await Promise.all([
        postsApi.getPost(id),
        postsApi.listReplies(id),
      ]);
      setPost(postData);
      setReplies(replyData.replies || []);
    } catch (err) {
      Alert.alert("Error", "Could not load this post.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpvote = async () => {
    try {
      const result = await postsApi.upvotePost(id);
      setPost((p) => ({ ...p, upvoteCount: result.upvoteCount }));
      setUpvoted(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) setUpvoted(true);
    }
  };

  const handleSendReply = async () => {
    if (replyText.trim().length < 10) {
      Alert.alert("Reply too short", "Please write at least 10 characters.");
      return;
    }
    setSending(true);
    try {
      await postsApi.createReply(id, { body: replyText.trim() });
      setReplyText("");
      await load();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to submit reply.";
      Alert.alert("Couldn't reply", message);
    } finally {
      setSending(false);
    }
  };

  if (loading || !post) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#adc6ff" />
      </SafeAreaView>
    );
  }

  const categoryName = post.category?.name || "General";
  const catStyle = CATEGORY_STYLES[categoryName] || { bg: "#1a2744", text: "#adc6ff" };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3 border-b border-outline-variant/30">
          <View className="flex-row items-center gap-3">
            <Ionicons name="shield-checkmark" size={18} color="#adc6ff" />
            <Text className="text-on-surface text-lg font-semibold">AnonymousDesk</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-1 px-5 pt-4 pb-2">
            <Ionicons name="arrow-back-outline" size={16} color="#8c909f" />
            <Text className="text-outline text-sm">Back to Discussions</Text>
          </TouchableOpacity>

          <View className="bg-surface-low border border-outline-variant/50 rounded-xl mx-5 mb-5 p-5">
            <View className="flex-row items-center justify-between mb-4">
              <View className="px-3 py-1 rounded-full" style={{ backgroundColor: catStyle.bg }}>
                <Text className="text-xs font-semibold tracking-wider uppercase" style={{ color: catStyle.text }}>
                  {categoryName}
                </Text>
              </View>
              <Text className="text-outline text-xs">{new Date(post.createdAt).toLocaleDateString()}</Text>
            </View>

            <Text className="text-on-surface text-2xl font-semibold leading-snug mb-4">{post.title}</Text>
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-5">{post.body}</Text>

            <View className="flex-row items-center gap-5 pt-4 border-t border-outline-variant/30">
              <TouchableOpacity onPress={handleUpvote} className="flex-row items-center gap-1.5">
                <Ionicons
                  name={upvoted ? "arrow-up-circle" : "arrow-up-circle-outline"}
                  size={16}
                  color={upvoted ? "#4ade80" : "#8c909f"}
                />
                <Text className={`text-xs ${upvoted ? "text-green-400" : "text-outline"}`}>
                  {post.upvoteCount} upvotes
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="chatbubbles-outline" size={14} color="#8c909f" />
                <Text className="text-outline text-xs">{post.replyCount} Responses</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="eye-outline" size={14} color="#8c909f" />
                <Text className="text-outline text-xs">{post.viewCount} Views</Text>
              </View>
            </View>
          </View>

          {post.aiSummary && (
            <View className="bg-primary/5 border border-primary/20 rounded-xl mx-5 mb-5 p-4">
              <View className="bg-primary/10 rounded-md px-2 py-0.5 self-start mb-2">
                <Text className="text-primary text-xs font-semibold tracking-wider">AI SUMMARY</Text>
              </View>
              <Text className="text-on-surface-variant text-sm leading-relaxed">{post.aiSummary}</Text>
            </View>
          )}

          <View className="px-5 mb-4">
            <View className="flex-row items-center gap-2 mb-4">
              <Ionicons name="ribbon-outline" size={18} color="#adc6ff" />
              <Text className="text-on-surface text-lg font-semibold">Replies</Text>
            </View>

            {replies.length === 0 ? (
              <View className="items-center py-8">
                <Ionicons name="chatbubbles-outline" size={32} color="#424754" />
                <Text className="text-outline text-sm mt-2">Be the first to share advice</Text>
              </View>
            ) : (
              replies.map((r) => (
                <View key={r.id}>
                  <ReplyCard reply={r} onHelpful={postsApi.markReplyHelpful} />
                  {(r.children || []).map((child) => (
                    <View key={child.id} className="ml-6">
                      <ReplyCard reply={child} onHelpful={postsApi.markReplyHelpful} indent />
                    </View>
                  ))}
                </View>
              ))
            )}
          </View>

          <View className="h-4" />
        </ScrollView>

        <View className="px-4 pb-4 pt-3 border-t border-outline-variant/30 flex-row items-center gap-3">
          <View className="flex-1 bg-surface-high border border-outline-variant rounded-xl px-4 py-3">
            <TextInput
              value={replyText}
              onChangeText={setReplyText}
              placeholder="Add your professional perspective..."
              placeholderTextColor="#424754"
              className="text-on-surface text-sm"
            />
          </View>
          <TouchableOpacity
            onPress={handleSendReply}
            disabled={sending}
            className="bg-primary-container rounded-xl px-4 py-3"
          >
            {sending ? (
              <ActivityIndicator size="small" color="#002e6a" />
            ) : (
              <Text className="text-on-primary text-sm font-semibold">Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
