import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const tabs = [
  { name: "Chats", icon: "chatbubbles-outline", route: "/anonymous/vendors_list" },
  { name: "Occupation", icon: "briefcase-outline", route: "/anonymous/vendors_list" },
  { name: "Updates", icon: "refresh-outline", route: "/anonymous/vendors_list" },
  { name: "Contacts", icon: "call-outline", route: "/anonymous/following" },
  { name: "Profile", icon: "person-outline", route: "/(tabs)/profile_personal" },
];

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route) => {
    if (route === "/(tabs)/profile_personal") {
      return pathname.includes("profile_personal");
    }
    if (route === "/anonymous/following") {
      return pathname.includes("following");
    }
    if (route === "/anonymous/vendors_list") {
      return pathname.includes("vendors_list") || pathname === "/";
    }
    return pathname === route;
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] flex-row items-center justify-around py-2 px-2">
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.route)}
            className="flex-1 items-center justify-center py-2"
            activeOpacity={0.7}
          >
            <View
              className={`items-center justify-center rounded-xl px-3 py-1 ${
                active ? "bg-[#9F583C]" : ""
              }`}
            >
              <Ionicons
                name={tab.icon}
                size={22}
                color={active ? "#ffffff" : "#6b7280"}
              />
              <Text
                className={`text-[10px] mt-1 font-semibold ${
                  active ? "text-white" : "text-[#6b7280]"
                }`}
              >
                {tab.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
