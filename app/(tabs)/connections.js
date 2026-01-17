import { connections } from "@/data/connections";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConnectionsScreen() {
    return (
        <SafeAreaView edges={["bottom"]} className="flex-1 bg-[#DCEEF6]">
            <FlatList
                data={connections}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
                ListHeaderComponent={
                    <Text className="text-[14px] text-[#6D5FFD] font-[Roboto] mb-4">
                        1,234 connections
                    </Text>
                }
                renderItem={({ item }) => <ConnectionCard item={item} />}
            />
        </SafeAreaView>
    );
}

/* ---------------- COMPONENTS ---------------- */

function ConnectionCard({ item }) {
    return (
        <View className="bg-white rounded-2xl  p-3 mb-3 flex-row items-center">
            {/* Avatar */}
            <View className="relative">
                <Image
                    source={{ uri: item.avatar }}
                    className="w-12 h-12 rounded-full"
                />
                {item.online && (
                    <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
            </View>

            {/* Info */}
            <View className="flex-1 ml-3">
                <Text className="text-lg font-[RobotoMedium] font-bold text-[#1F2937]">
                    {item.name}
                </Text>
                <Text className="text-[12px] text-[#6D5FFD] font-[Roboto]">
                    {item.role}
                </Text>
            </View>

            {/* Swap Icon */}
            <Ionicons
                name="swap-horizontal"
                size={18}
                color="#1F2937"
                className="mr-3"
            />

            {/* Message Button */}
            <TouchableOpacity className="bg-[#9C5A3C] px-4 py-2 rounded-full">
                <Text className="text-white text-[14px] font-[RobotoMedium]">
                    Message
                </Text>
            </TouchableOpacity>
        </View>
    );
}
