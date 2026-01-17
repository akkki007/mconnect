import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const profileFields = [
  "Name",
  "Occupation",
  "Company Name",
  "Email Id",
  "Phone Number",
  "School Name",
  "College Name",
  "Address Line 1",
  "Address Line 2",
  "City",
  "State",
  "Zip Code",
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-[#c7dbed]"
      edges={["top", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-[#c7dbed] border-b border-[#b6c7d8] px-4 pb-3 pt-8 shadow-sm shadow-[#122430]/10">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="rounded-full p-2"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-[20px] font-semibold tracking-wide text-[#0f172a]">
              Profile Settings
            </Text>
            <View style={{ width: 32 }} />
          </View>
        </View>

        <View className="px-4 pt-6">

          <View className="items-center mt-4">
            <View className="h-[109px] w-[109px] rounded-full ">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                }}
                className="h-full w-full rounded-full image-cover"
              />
              <TouchableOpacity
                className="bg-[#9F583C] rounded-full p-1 absolute bottom-0 right-0 z-10 h-6 w-6 items-center justify-center ">
                <Ionicons name="pencil" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mx-4 mt-6 rounded-[32px] bg-white px-5 py-6 shadow-xl">
          {profileFields.map((field, index) => (
            <View
              key={field}
              className={`flex-row items-center justify-between border-b border-[#e2e8f0] py-3 ${index === profileFields.length - 1 ? "border-b-0" : ""
                }`}
            >
              <Text className="text-sm font-semibold tracking-wider text-[#a7b0ba]">
                {field}
              </Text>
              <TouchableOpacity className="h-6 w-6 items-center justify-center rounded-full border border-[#9C4A2F] bg-[#fff8f1]">
                <Ionicons name="pencil" size={14} color="#9C4A2F" />
              </TouchableOpacity>
            </View>
          ))}

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-1 border-b border-[#e2e8f0] pb-4">
              <Text className="text-sm font-semibold tracking-[0.2em] text-[#a7b0ba] italic">
                Age
              </Text>
            </View>
            <View className="ml-4 flex-1 border-b border-[#e2e8f0] pb-4">
              <Text className="text-sm font-semibold tracking-[0.2em] text-[#a7b0ba] italic">
                Gender
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
