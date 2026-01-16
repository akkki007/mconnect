import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Personal");

  const [businessOptions, setBusinessOptions] = useState([
    { id: "availableForWork", text: "Available for work?", value: true },
    {
      id: "readyForVolunteering",
      text: "Ready for Volunteering?",
      value: true,
    },
    { id: "acceptingOrders", text: "Accepting Orders?", value: false },
    { id: "searchable", text: "Want Others to Search You?", value: true },
    { id: "shareMobile", text: "Want to Share Mobile?", value: true },
    { id: "shareEmail", text: "Want to Share Email?", value: false },
  ]);

  const handleToggleChange = (id, newValue) => {
    setBusinessOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D6EAF3]">
      <View className="h-10 bg-[#D6EAF3]" />

      {/* Header */}
      <View className="  bg-[#D6EAF3]">
        <View className="flex-row items-center justify-between px-5">
          <View className="flex-row items-center space-x-3">
            <Ionicons name="menu" size={24} color="#000" />
            <Text className="pl-5 font-semibold text-[20px] text-black font-opensans">
              Profile
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/Settings")}>
            <Ionicons name="settings-outline" size={34} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Card */}
        <View className="mx-0.5  bg-[#CFE5EF] rounded-3xl px-4 py-2">
          <View className="flex-row items-center">
            {/* Avatar */}
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=32" }}
              className="w-[125px] h-[125px] rounded-full border-4 border-white"
            />

            {/* Info */}
            <View className="ml-4 flex-1">
              <View className="flex-row items-center">
                <Text className="text-[20px] text-black font-inter font-semibold">
                  Ethan Carter
                </Text>
              </View>

              <View className="flex-row items-center justify-center mt-1">
                <Text className="text-[16px] text-[#4E4E4EB2] font-opensans shrink flex-wrap">
                  Software Engineer at Innovate Solutions
                </Text>
                <View className="ml-2 bg-[#5f53c8] rounded-full p-1">
                  <Ionicons name="pencil" size={12} color="#fff" />
                </View>
              </View>

              <View className="flex-row items-center mt-1">
                <Text className="text-[13px] text-[#4E4E4EB2] font-opensans">
                  Food Engineer . Technical Writer
                </Text>
              </View>
            </View>
          </View>

          {/* Availability */}
          <View className="mt-4 w-full flex-row justify-center items-center px-3 py-1 rounded-full">
            <Text className="text-[#8D86C9] text-[16px] font-montserrat font-semibold text-center">
              Available for online calls only
            </Text>

            <View className="ml-2 bg-[#5f53c8] rounded-full p-1">
              <Ionicons name="pencil" size={12} color="#fff" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-white mx-5 rounded-full  ">
          <TouchableOpacity
            className={`flex-1 py-2 rounded-full ${
              selectedTab === "Personal" ? "bg-[#9C4A2F]" : ""
            }`}
            onPress={() => setSelectedTab("Personal")}
          >
            <Text
              className={`text-center font-montserrat ${
                selectedTab === "Personal" ? "text-white" : "text-gray-700"
              }`}
            >
              Personal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-2 rounded-full ${
              selectedTab === "Business" ? "bg-[#9C4A2F]" : ""
            }`}
            onPress={() => setSelectedTab("Business")}
          >
            <Text
              className={`text-center font-montserrat ${
                selectedTab === "Business" ? "text-white" : "text-gray-700"
              }`}
            >
              Business
            </Text>
          </TouchableOpacity>
        </View>

        {/* Personal Tab Content */}
        {selectedTab === "Personal" && (
          <>
            {/* About Us */}
            <View className="mt-6 px-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg text-black font-montserrat-bold">
                  About Us
                </Text>
              </View>

              <View className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <View className="flex-row mb-2">
                  <Text className="text-base text-gray-800 font-opensans leading-6 flex-1">
                    Hello there!! {"\n\n"}
                    My name is Ethan Carter. I am a software Engineer at Rootkit
                    Consultancy.
                  </Text>
                  <View>
                    <TouchableOpacity className="bg-[#5f53c8] rounded-full p-1">
                      <Ionicons name="pencil" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Business Tab Content */}
        {selectedTab === "Business" && (
          <>
            {/* Power to You */}
            <View className="mt-4 px-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg text-black font-inter-bold">
                  Power to You
                </Text>
              </View>

              <View className="bg-white min-w-80 min-h-44 rounded-2xl px-8 py-4 shadow-lg border border-gray-100">
                {businessOptions.map((option, index) => (
                  <View
                    key={option.id}
                    className={`flex-row items-center justify-between`}
                  >
                    <Text className="text-base text-gray-800 font-opensans ">
                      {option.text}
                    </Text>
                    <Switch
                      value={option.value}
                      onValueChange={(value) =>
                        handleToggleChange(option.id, value)
                      }
                      trackColor={{ false: "#D1D5DB", true: "#9C4A2F" }}
                      thumbColor="#fff"
                    />
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Contact */}
        <View className="mt-6 px-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg text-black font-montserrat-bold">
              Contact
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <View className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
              <View className="bg-[#9C4A2F] w-11 h-11 p-3 rounded-full">
                <Ionicons name="mail" size={20} color="#fff" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-md text-gray-800 font-opensans font-semibold">
                  ethan.carter@gmail.com
                </Text>
              </View>
              <TouchableOpacity className="bg-[#5f53c8] rounded-full p-1">
                <Ionicons name="pencil" size={12} color="#fff" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center">
              <View className="bg-[#9C4A2F] w-11 h-11 p-3 rounded-full">
                <Ionicons name="call" size={20} color="#fff" />
              </View>
              <View className="ml-4  flex-1">
                <Text className="text-md text-gray-800 font-opensans font-semibold">
                  9876543210
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
