import { profileFormFields } from "@/data/profileFormFields";
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePoster from "../../assets/images/image_poster.png";

export default function ProfileSettingsScreen() {
    return (
        <SafeAreaView edges={["bottom"]} className="flex-1 bg-[#DCEEF6]">
            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Avatar */}
                <View className="items-center mb-6">
                    <View className="relative">
                        <Image
                            source={imagePoster}
                            className="w-[109px] h-[109px] bg-[#898A8D] rounded-full"
                            resizeMode="cover"
                        />
                        <View className="absolute bottom-0 right-0 bg-[#9C5A3C] w-6 h-6 rounded-full items-center justify-center">
                            <Ionicons name="pencil" size={12} color="white" />
                        </View>
                    </View>
                </View>

                {/* Form Card */}
                <Card>
                    {profileFormFields.map(field => (
                        <FieldRow key={field.key} label={field.label} />
                    ))}

                    {/* Age + Gender Row */}
                    <View className="flex-row justify-between mt-2">
                        <FieldRow label="Age" half />
                        <FieldRow label="Gender" half />
                    </View>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ children }) {
    return (
        <View className="bg-white rounded-2xl px-4 py-2 shadow-sm">
            {children}
        </View>
    );
}

function FieldRow({ label, half }) {
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between py-3 ${half ? "w-[48%]" : "w-full"
                }`}
            activeOpacity={0.7}
        >
            <Text className="text-[15px] text-[#8E8E93] font-[Roboto]">
                {label}
            </Text>

            <View className="bg-[#9C5A3C] w-5 h-5 rounded-full items-center justify-center">
                <Ionicons name="pencil" size={11} color="white" />
            </View>
        </TouchableOpacity>
    );
}
