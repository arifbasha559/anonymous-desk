import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { CONTEXT_TAGS } from "../../data/mockData";

const MAX_CHARS = 2500;

export default function CreatePost() {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!body.trim()) {
      Alert.alert("Empty dilemma", "Please describe your situation before posting.");
      return;
    }
    Alert.alert(
      "Posted confidentially",
      "Your dilemma has been submitted anonymously. You'll be notified when experts respond.",
      [{ text: "OK", onPress: () => router.replace("/(tabs)") }]
    );
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const charsLeft = MAX_CHARS - body.length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <View className="flex-row items-center gap-2">
            <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
            <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
          </View>
          <TouchableOpacity className="w-9 h-9 rounded-full bg-surface-high items-center justify-center">
            <Ionicons name="person-outline" size={18} color="#8c909f" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View className="px-5 pt-2">
            {/* Anonymous badge */}
            <View className="flex-row items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 mb-5 self-start">
              <Ionicons name="shield-checkmark-outline" size={14} color="#adc6ff" />
              <Text className="text-primary text-xs font-medium">Verified Anonymous</Text>
            </View>

            {/* Title */}
            <Text className="text-on-surface text-3xl font-semibold mb-3">
              Draft a Dilemma
            </Text>
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Describe the professional challenge you're facing. Our community thrives on detail,
              but please omit any specifically identifying company or personal names to maintain
              the integrity of the private space.
            </Text>

            {/* Text input */}
            <View className="bg-surface-high border border-outline-variant rounded-xl mb-2 p-4 min-h-52">
              <TextInput
                multiline
                value={body}
                onChangeText={(t) => t.length <= MAX_CHARS && setBody(t)}
                placeholder={`What's unfolding at work? E.g., 'I've discovered a significant pay disparity on my team, but bringing it up might jeopardize my recent promotion...'`}
                placeholderTextColor="#424754"
                className="text-on-surface text-base leading-relaxed flex-1"
                style={{ minHeight: 140, textAlignVertical: "top" }}
              />
              {/* Toolbar */}
              <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-outline-variant/50">
                <View className="flex-row gap-4">
                  <TouchableOpacity>
                    <Text className="text-outline font-bold text-sm">B</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className="text-outline italic text-sm">I</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="list-outline" size={16} color="#8c909f" />
                  </TouchableOpacity>
                </View>
                <Text className={`text-xs ${charsLeft < 100 ? "text-error" : "text-outline"}`}>
                  {body.length} / {MAX_CHARS}
                </Text>
              </View>
            </View>

            {/* Pro tip */}
            <View className="flex-row gap-2 mb-6">
              <Ionicons name="information-circle-outline" size={14} color="#8c909f" />
              <Text className="text-outline text-xs flex-1 leading-relaxed">
                Pro tip: The more specific your situation, the better advice you'll get
              </Text>
            </View>

            {/* Context tags */}
            <Text className="text-outline text-xs font-medium tracking-widest uppercase mb-3">
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
                      active
                        ? "border-primary bg-primary/10"
                        : "border-outline-variant bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-sm ${active ? "text-primary font-medium" : "text-on-surface-variant"}`}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Save Draft */}
            <TouchableOpacity
              onPress={handleSaveDraft}
              className="items-center py-3 mb-3"
            >
              <Text className="text-on-surface-variant text-sm font-medium">
                {saved ? "✓ Draft saved" : "Save Draft"}
              </Text>
            </TouchableOpacity>

            {/* Post button */}
            <TouchableOpacity onPress={handlePost} className="rounded-xl overflow-hidden mb-6">
              <LinearGradient
                colors={["#4d8eff", "#3b6cf6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center gap-2 py-4"
              >
                <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
                <Text className="text-white text-base font-semibold">
                  Post Confidentially
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
