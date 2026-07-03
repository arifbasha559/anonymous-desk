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
import { POSTS, TRENDING_TOPICS } from "../data/mockData";
import { LinearGradient } from "expo-linear-gradient";


function PostCard({ post, onPress }) {
    const catStyle = CATEGORY_STYLES[post.category] || { bg: "#1a2744", text: "#adc6ff" };

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-surface border gap-2 border-outline-variant/50 rounded-xl mx-5 mb-3 p-4"
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

const data = [
    {
        title: "Account Security",
        options: {
            1: "Change private key",
            2: "Multi-factor Authentication"
        },
        icon: "shield-checkmark-outline"
    },
    {
        title: "Privacy",
        options: {
            1: "Anonymity level",
            2: "Zero-knowledge Encryption"
        },
        icon: "eye-off-outline"
    },
    {
        title: "Notifications",
        options: {
            1: "Push Alerts",
            2: "Email Digests"
        },
        icon: "notifications-outline"
    },
    {
        title: "Support",
        options: {
            1: "Help Center",
            2: "Privacy Policy",
            3: "Terms of Service"
        },
        icon: "shield-checkmark-outline"
    }
]
export default function setting() {
    const router = useRouter();


    return (
        <SafeAreaView className="flex-1  bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-3">
                <View className="flex-row items-center gap-2">
                    <Ionicons name="shield-checkmark" size={20} color="#adc6ff" />
                    <Text className="text-on-surface text-xl font-semibold">AnonymousDesk</Text>
                </View>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 30 }} className=" mb-4"
            >
                {/* Trending topics */}


                {/* Verified badge */}
                <View className=" items-start gap-1.5 px-5  ">
                    <Text className="text-white text-3xl tracking-widest font-medium">
                        Settings
                    </Text>
                    <Text className=" text-on-surface-variant text-lg pr-20   mb-10 py-2 ">
                        Manage your digital vault and anonymily preferences.
                    </Text>
                </View>






                {data.map((item, index) => (

                    <Text>

                    </Text>))}





                <View className="px-6 gap-3 mt-auto mb-8">
                    <TouchableOpacity
                        onPress={() => router.push("/create")}
                        className="overflow-hidden rounded-xl border border-error-container"
                    >

                        <View className="flex-row w-full items-center justify-center gap-2 py-4">
                            <Text className="text-error-container text-base font-semibold">
                                Log out
                            </Text>
                            <Ionicons name="arrow-forward" size={16} color="#93000a" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="h-6" />
            </ScrollView>
        </SafeAreaView>
    );
}
