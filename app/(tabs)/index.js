import image_poster from "@/assets/images/image_poster.png";
import { powerOptions } from "@/data/powerOptions";
import { profileOptions } from "@/data/profileOptions";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------------- USER DATA ---------------- */

const userProfile = {
  name: "Eathan Carter",
  role: "Software Engineer at Rootkit Consultancy",
  availability: "Available for online calls only",
  email: "ethan.carter@gmail.com",
  phone: "9876543210",
  avatar: image_poster,
};

/* ---------------- SCREEN ---------------- */

export default function ProfileScreen() {
  // 🔥 REAL, WORKING STATE FOR TOGGLES
  const [powerState, setPowerState] = useState(
    Object.fromEntries(
      powerOptions.map(option => [option.key, option.default])
    )
  );

  const togglePower = key => {
    setPowerState(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView className="flex-1 bg-[#DCEEF6] px-4">
      {/* Avatar */}
      <View className="items-center  mb-4">
        <View className="relative ">
          <Image
            source={userProfile.avatar}
            className="w-[120px] h-[125px] bg-[#898A8D] rounded-full"
          />
          <View className="absolute bottom-0 right-0 bg-[#9C5A3C] w-5 h-5 rounded-full items-center justify-center">
            <Ionicons name="pencil" size={12} color="white" />
          </View>
        </View>
      </View>

      {/* User Info */}
      <Card >
        <View className="flex-row justify-between ">
          <View className="pr-4 ">
            <Text className="text-[24px] font-bold font-[RobotoBold]">
              {userProfile.name}
            </Text>
            <Text className="text-[14px] text-black font-medium font-[Roboto]">
              {userProfile.role}
            </Text>
            <Text className="text-[14px] text-gray-500 text-[#767779] mt-1 font-[Roboto]">
              {userProfile.availability}
            </Text>
          </View>
          <View className="absolute bottom-0 right-0 bg-[#9C5A3C] w-5 h-5 rounded-full items-center justify-center">
            <Ionicons name="pencil" size={12} color="white" />
          </View>
        </View>
      </Card>

      {/* Contact Info */}
      <Card>
        <InfoRow icon="mail" value={userProfile.email} />
        <InfoRow icon="call" value={userProfile.phone} />

      </Card>

      {/* Power to You */}
      <Text className="font-[RobotoMedium] text-lg mb-2 mt-4">
        Power to You
      </Text>

      <Card>
        {powerOptions.map(option => (
          <ToggleRow
            key={option.key}
            label={option.label}
            value={powerState[option.key]}
            onToggle={() => togglePower(option.key)}
          />
        ))}
      </Card>

      {/* Options */}
      <Card>
        {profileOptions.map((item, index) => (
          <OptionRow
            key={index}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </Card>
    </ScrollView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ children }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {children}
    </View>
  );
}

function InfoRow({ icon, value }) {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={24} color="#9C5A3C" />
        <Text className="font-[Roboto] ml-2 text-md">{value}</Text>
      </View>
      <View className="absolute bottom-0 right-0 bg-[#9C5A3C] w-5 h-5 rounded-full items-center justify-center">
        <Ionicons name="pencil" size={12} color="white" />
      </View>
    </View>
  );
}

function ToggleRow({ label, value, onToggle }) {
  return (
    <View className="flex-row justify-between items-center h-12">
      <Text className="font-[Roboto] text-[16px]">{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ true: "#9C5A3C", false: "#D1D5DB" }}
        thumbColor="white"
      />
    </View>
  );
}

function OptionRow({ icon, label }) {
  return (
    <TouchableOpacity className="flex-row justify-between items-center h-12">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={20} color="#9C5A3C" />
        <Text className="font-[Roboto] text-[16px]">{label}</Text>
      </View>
      <View className="absolute bottom-0 right-0 bg-[#9C5A3C] w-5 h-5 rounded-full items-center justify-center">
        <Ionicons name="pencil" size={12} color="white" />
      </View>
    </TouchableOpacity>
  );
}
