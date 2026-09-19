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
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as postsApi from "../../api/posts";
import { ApiError } from "../../api/client";

const MAX_CHARS = 5000;
const CONTEXT_TAGS = ["Salary", "Management", "Ethics", "Burnout", "Career Switch", "Legal", "HR"];

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handlePost = async () => {
    if (title.trim().length < 10) {
      Alert.alert("Title too short", "Please write at least 10 characters for the title.");
      return;
    }
    if (body.trim().length < 30) {
      Alert.alert("Body too short", "Please describe your situation in at least 30 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await postsApi.createPost({ title, body, tags: selectedTags });
      setTitle("");
      setBody("");
      setSelectedTags([]);
      Alert.alert("Posted confidentially", "Your dilemma has been submitted anonymously.", [
        { text: "View post", onPress: () => router.replace(`/post/${result.postId}`) },
      ]);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to submit post.";
      Alert.alert("Couldn't post", message);
    } finally {
      setSubmitting(false);
    }
  };

  const charsLeft = MAX_CHARS - body.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
            <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View className="px-5 pt-2">
            <View className="flex-row items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 mb-5 self-start">
              <Ionicons name="shield-checkmark-outline" size={14} color="#adc6ff" />
              <Text className="text-primary text-xs font-medium">Verified Anonymous</Text>
            </View>

            <Text className="text-on-surface text-3xl font-semibold mb-3">Draft a Dilemma</Text>
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Describe the professional challenge you're facing. Please omit any specifically
              identifying company or personal names.
            </Text>

            <View className="bg-surface-high border border-outline-variant rounded-xl mb-4 px-4 py-3">
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Title — a one-line summary"
                placeholderTextColor="#424754"
                className="text-on-surface text-base"
              />
            </View>

            <View className="bg-surface-high border border-outline-variant rounded-xl mb-2 p-4 min-h-52">
              <TextInput
                multiline
                value={body}
                onChangeText={(t) => t.length <= MAX_CHARS && setBody(t)}
                placeholder="What's unfolding at work?"
                placeholderTextColor="#424754"
                className="text-on-surface text-base leading-relaxed flex-1"
                style={{ minHeight: 140, textAlignVertical: "top" }}
              />
              <View className="flex-row items-center justify-end mt-3 pt-3 border-t border-outline-variant/50">
                <Text className={`text-xs ${charsLeft < 100 ? "text-error" : "text-outline"}`}>
                  {body.length} / {MAX_CHARS}
                </Text>
              </View>
            </View>

            <Text className="text-outline text-xs font-medium tracking-widest uppercase mb-3 mt-4">
              Context Tags
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-8">
              {CONTEXT_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-lg border ${
                      active ? "border-primary bg-primary/10" : "border-outline-variant bg-transparent"
                    }`}
                  >
                    <Text className={`text-sm ${active ? "text-primary font-medium" : "text-on-surface-variant"}`}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity onPress={handlePost} disabled={submitting} className="rounded-xl overflow-hidden mb-6">
              <LinearGradient
                colors={["#4d8eff", "#3b6cf6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center gap-2 py-4"
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
                    <Text className="text-white text-base font-semibold">Post Confidentially</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
