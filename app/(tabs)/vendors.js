import { vendors } from "@/data/vendors";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VendorsScreen() {
    return (
        <SafeAreaView edges={["bottom"]} className="flex-1 bg-[#DCEEF6]">
            <FlatList
                data={vendors}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                }}
                renderItem={({ item }) => <VendorCard item={item} />}
            />
        </SafeAreaView>
    );
}

/* ---------------- COMPONENTS ---------------- */

function VendorCard({ item }) {
    return (
        <View className="bg-white rounded-2xl p-3 mb-3 flex-row items-center">
            {/* Avatar */}
            <Image
                source={{ uri: item.avatar }}
                className="w-[70px] h-[70px] rounded-full"
            />

            {/* Info */}
            <View className="flex-1 ml-3">
                <Text className="text-[16px] font-[RobotoMedium] text-[#1F2937]">
                    {item.name}
                </Text>
                <Text className="text-[14px] text-gray-500 font-[Roboto]">
                    {item.role}
                </Text>

                {item.recommendedBy && (
                    <View className="flex-row  items-center mt-1">
                        <Image
                            source={{ uri: item.avatar }}
                            className="w-[25px] h-[25px] rounded-full"
                        />
                        <Text className="text-[14px] ml-1 text-gray-500 font-[Roboto] ">
                            Recommended by {item.recommendedBy}
                        </Text>
                    </View>
                )}
            </View>

            {/* Rating */}
            <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FBBF24" />
                <Text className="ml-[12px] text-[14px] font-[RobotoMedium]">
                    {item.rating}
                </Text>
                <Text className="text-[11px] text-gray-400 ml-1">
                    ({item.reviews})
                </Text>
            </View>
        </View >
    );
}
