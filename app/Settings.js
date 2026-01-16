import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingsScreen() {
  const router = useRouter();
  const settingsOptions = [
    {
      id: "account",
      title: "Account",
      description: "Privacy, security, change number",
      icon: "key-outline",
    },
    {
      id: "chat",
      title: "Chat",
      description: "Chat history, theme, wallpapers",
      icon: "chatbubble-outline",
    },
    {
      id: "notification",
      title: "Notification",
      description: "Messages, group and others",
      icon: "notifications-outline",
    },
    {
      id: "help",
      title: "Help",
      description: "Help center, contact us, privacy policy",
      icon: "help-circle-outline",
    },
    {
      id: "storage",
      title: "Storage & Data",
      description: "Network usage, storage usage",
      icon: "information-circle-outline",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#D6EAF3]">
      {/* Status Bar Spacer */}
      <View className="h-10 bg-[#D6EAF3]" />

      {/* Header */}
      <View className="px-5 py-4 bg-[#D6EAF3]">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-black font-opensans">
            Settings
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Section */}
        <View className="px-5 mt-10 mb-10">
          <View className="flex-row items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-[20px]  font-semibold text-black font-opensans-bold">
                Nazrul Islam
              </Text>
              <Text className="text-sm text-gray-600 font-opensans">
                Never give up 💪
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Options Card */}
        <View className="mx-5 bg-white rounded-3xl p-4 shadow-lg">
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              className={`flex-row items-center py-4 ${
                index < settingsOptions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Icon Container */}
              <View className="w-12 h-12 rounded-full bg-[#9C4A2F] items-center  justify-center">
                <Ionicons name={option.icon} size={24} color="#fff" />
              </View>

              {/* Text Content */}
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-black font-opensans">
                  {option.title}
                </Text>
                <Text className="text-sm text-gray-500 font-opensans mt-0.5">
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
