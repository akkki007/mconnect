import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#D6EAF3]">
      <View className="h-10 bg-[#D6EAF3]" />

      {/* Header */}
      <View className="pt-4 pb-5 bg-[#D6EAF3]">
        <View className="flex-row items-center justify-between px-5">
          <View className="flex-row items-center space-x-3">
            <Ionicons name="menu" size={24} color="#000" />
            <Text className="pl-5 font-semibold text-[20px] text-black font-opensans">
              Profile
            </Text>
          </View>

          <Ionicons name="settings-outline" size={34} color="#000" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Card */}
        <View className="mx-0.5 mt-2 bg-[#CFE5EF] rounded-3xl p-4">
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
        <View className="flex-row bg-white mx-5 mt-2 rounded-full  ">
          <TouchableOpacity className="flex-1 bg-[#9C4A2F] py-2 rounded-full">
            <Text className="text-center text-white font-montserrat">
              Personal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 py-2">
            <Text className="text-center text-gray-700 font-montserrat">
              Business
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Us */}
        <View className="mt-6 px-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg text-black font-inter-bold">About Us</Text>
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
