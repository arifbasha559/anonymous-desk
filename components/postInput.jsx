import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const MAX_CHARS = 1000;
const MAX_TITLE_CHARS = 80;

export default function PostInput() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const charsLeft = MAX_CHARS - body.length;

  return (
    <View className="bg-surface-high border border-outline-variant rounded-xl mb-2 p-4 flex-1" style={{ minHeight: 250 }}>
      
      {/* 1. Dedicated Title Field */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="An intriguing title..."
        placeholderTextColor="#424754"
        maxLength={MAX_TITLE_CHARS}
        className="text-on-surface text-xl font-bold mb-3"
      />

      {/* Subtle Divider */}
      <View className="h-[1px] bg-outline-variant/30 w-full mb-3" />

      {/* 2. Native Multiline Description Field */}
      <TextInput
        multiline
        value={body}
        onChangeText={(text) => {
          if (text.length <= MAX_CHARS) {
            setBody(text);
          }
        }}
        placeholder={"What's unfolding at work? E.g., 'I've discovered a significant pay disparity...'"}
        placeholderTextColor="#424754"
        className="text-on-surface text-base leading-relaxed flex-1"
        style={{ minHeight: 140, textAlignVertical: "top" }}
      />

      {/* Footer / Character Count */}
      <View className="flex-row items-center justify-end mt-3 pt-3 border-t border-outline-variant/50">
        <Text className={`text-xs ${charsLeft < 100 ? "text-error" : "text-outline"}`}>
          {body.length} / {MAX_CHARS}
        </Text>
      </View>
    </View>
  );
}