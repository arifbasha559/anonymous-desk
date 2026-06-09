import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { POSTS } from "../../data/mockData";

const CATEGORY_STYLES = {
  Tech: { bg: "#1a2744", text: "#5b9cf6" },
  Legal: { bg: "#1e1a2e", text: "#a78bfa" },
  Finance: { bg: "#2a1a1a", text: "#f87171" },
  Healthcare: { bg: "#1a2a1a", text: "#4ade80" },
  Management: { bg: "#2a1f0a", text: "#fbbf24" },
};

function ExpertReply({ comment }) {
  const [helped, setHelped] = useState(false);
  const [helpCount, setHelpCount] = useState(comment.helpful);

  const handleHelped = () => {
    if (!helped) {
      setHelpCount((c) => c + 1);
      setHelped(true);
    }
  };

  return (
    <View
      className={`rounded-xl p-4 mb-3 ${
        comment.isExpertReply
          ? "bg-surface-low border-l-2"
          : "bg-surface-container border border-outline-variant/30"
      }`}
      style={
        comment.isExpertReply
          ? { borderLeftColor: "#f59e0b", backgroundColor: "#1c1b1b" }
          : {}
      }
    >
      {/* Meta */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2 flex-wrap">
          <Text className="text-primary text-xs font-medium">
            {comment.role} · {comment.experience}
          </Text>
          {comment.isExpert && (
            <View className="flex-row items-center gap-1 bg-amber-500/10 rounded-full px-2 py-0.5">
              <Ionicons name="shield-checkmark" size={10} color="#f59e0b" />
              <Text className="text-amber-400 text-xs font-semibold">VERIFIED EXPERT</Text>
            </View>
          )}
        </View>
        <Text className="text-outline text-xs">{comment.timeAgo}</Text>
      </View>

      {/* Body */}
      <Text className="text-on-surface-variant text-sm leading-relaxed mb-3">
        {comment.body}
      </Text>

      {/* Actions */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={handleHelped}
          className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${
            helped ? "border-green-500/50 bg-green-500/10" : "border-outline-variant"
          }`}
        >
          <Ionicons
            name={helped ? "thumbs-up" : "thumbs-up-outline"}
            size={12}
            color={helped ? "#4ade80" : "#8c909f"}
          />
          <Text className={`text-xs ${helped ? "text-green-400" : "text-outline"}`}>
            This helped me ({helpCount})
          </Text>
        </TouchableOpacity>
        {comment.isExpertReply && (
          <TouchableOpacity className="flex-row items-center gap-1">
            <Ionicons name="return-down-forward-outline" size={13} color="#8c909f" />
            <Text className="text-outline text-xs">Reply</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [replyText, setReplyText] = useState("");

  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  const catStyle = CATEGORY_STYLES[post.category] || { bg: "#1a2744", text: "#adc6ff" };
  const expertReplies = post.comments.filter((c) => c.isExpertReply);
  const regularReplies = post.comments.filter((c) => !c.isExpertReply);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3 border-b border-outline-variant/30">
          <View className="flex-row items-center gap-3">
            <Ionicons name="shield-checkmark" size={18} color="#adc6ff" />
            <Text className="text-on-surface text-lg font-semibold">AnonymousDesk</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#8c909f" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Back */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-1 px-5 pt-4 pb-2"
          >
            <Ionicons name="arrow-back-outline" size={16} color="#8c909f" />
            <Text className="text-outline text-sm">Back to Discussions</Text>
          </TouchableOpacity>

          {/* Post card */}
          <View className="bg-surface-low border border-outline-variant/50 rounded-xl mx-5 mb-5 p-5">
            {/* Category + time */}
            <View className="flex-row items-center justify-between mb-4">
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: catStyle.bg }}
              >
                <Text className="text-xs font-semibold tracking-wider uppercase" style={{ color: catStyle.text }}>
                  {post.category}
                </Text>
              </View>
              <Text className="text-outline text-xs">{post.timeAgo}</Text>
            </View>

            {/* Title */}
            <Text className="text-on-surface text-2xl font-semibold leading-snug mb-4">
              {post.title}
            </Text>

            {/* Body */}
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-5">
              {post.body}
            </Text>

            {/* Stats */}
            <View className="flex-row items-center gap-5 pt-4 border-t border-outline-variant/30">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="chatbubbles-outline" size={14} color="#8c909f" />
                <Text className="text-outline text-xs">{post.replies} Responses</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="eye-outline" size={14} color="#8c909f" />
                <Text className="text-outline text-xs">
                  {(post.upvotes * 2 + 58).toLocaleString()} Views
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="shield-checkmark-outline" size={14} color="#8c909f" />
                <Text className="text-outline text-xs">Verified Anonymous</Text>
              </View>
            </View>
          </View>

          {/* Expert Advice section */}
          {post.comments.length > 0 && (
            <View className="px-5 mb-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="ribbon-outline" size={18} color="#adc6ff" />
                <Text className="text-on-surface text-lg font-semibold">Expert Advice</Text>
              </View>

              {/* AI Summary */}
              {post.aiSummary && (
                <View className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="bg-primary/10 rounded-md px-2 py-0.5">
                      <Text className="text-primary text-xs font-semibold tracking-wider">AI SUMMARY</Text>
                    </View>
                  </View>
                  <Text className="text-on-surface-variant text-sm leading-relaxed">
                    {post.aiSummary}
                  </Text>
                </View>
              )}

              {/* Expert replies */}
              {expertReplies.map((c) => (
                <ExpertReply key={c.id} comment={c} />
              ))}

              {/* Regular replies */}
              {regularReplies.map((c) => (
                <ExpertReply key={c.id} comment={c} />
              ))}

              {post.comments.length === 0 && (
                <View className="items-center py-8">
                  <Ionicons name="chatbubbles-outline" size={32} color="#424754" />
                  <Text className="text-outline text-sm mt-2">
                    Be the first to share advice
                  </Text>
                </View>
              )}
            </View>
          )}

          <View className="h-4" />
        </ScrollView>

        {/* Reply bar */}
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
          <TouchableOpacity className="flex-row items-center gap-1.5 px-3 py-2 rounded-full border border-outline-variant">
            <Ionicons name="shield-checkmark-outline" size={12} color="#8c909f" />
            <Text className="text-outline text-xs">Anonymized</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary-container rounded-xl px-4 py-3">
            <Text className="text-on-primary text-sm font-semibold">Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
