import { orderTabs } from "@/data/orderTabs";
import { orders } from "@/data/orders";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function OrderCard({ order }) {
    return (
        <View className=" rounded-2xl p-4 mb-4">
            {/* Header */}
            <View className="flex-row justify-between mb-[16px]">
                <Text className="font-[RobotoMedium] text-[14px]">
                    {order.seller}
                </Text>
                <Text
                    className="font-[RobotoMedium] text-[14px]"
                    style={{ color: order.statusColor }}
                >
                    {order.status}
                </Text>
            </View>

            {/* Items */}
            {order.items.map(item => (
                <OrderItem key={item.id} item={item} />
            ))}

            {/* Transit Info */}
            <View className="bg-[#FFF4EE] py-[8px] px-[10px] rounded-lg flex-row items-center mt-3">
                <AntDesign name="truck" size={16} color="#893D21" />
                <Text className="ml-2 text-[12px] font-semibold text-[#893D21] font-[Robotomedium]">In Transit ·</Text>
                <Text className="ml-2 text-[12px] text-gray-400 font-[Roboto]">
                    {order.deliveryNote}
                </Text>
            </View>

            {/* Total */}
            <View className="flex-row justify-end mt-3 items-end">
                <Text className="text-[14px] text-gray-800 mr-2">Total</Text>
                <Text className="text-[20px] font-semibold font-[RobotoBold] text-[#893D21]">
                    ${order.total}
                </Text>
            </View>

            {/* Actions */}
            <View className="flex-row justify-end mt-3">
                <ActionButton label="Refund" outlined />
                <ActionButton label="Confirm" />
            </View>
        </View>
    );
}

function OrderItem({ item }) {
    return (
        <View className="flex-row mb-[12px]">
            <Image
                source={require("@/assets/images/img1.jpg")}
                className="w-[76px] h-[76px] border-[1px] border-white rounded-lg"
            />

            <View className="flex-1 ml-3">
                <Text
                    numberOfLines={2}
                    className="text-[16px] font-bold font-[RobotoMedium]"
                >
                    {item.title}
                </Text>
                <Text className="text-[12px] text-gray-400 font-[Roboto]">
                    {item.subtitle}
                </Text>
            </View>

            <Text className="text-[14px] font-[RobotoMedium]">
                ${item.price}
            </Text>
        </View>
    );
}

function BottomActions() {
    return (
        <View className="absolute bottom-0 left-0 right-0 bg-[#DCEEF6] px-[24px] py-[20px]">
            <View className="flex-row justify-between items-center">
                {/* Cancel */}
                <TouchableOpacity className="flex-1 mr-3 bg-white rounded-[20px] py-[8px] items-center">
                    <Text className="text-[24px] font-[RobotoBold] text-black">
                        Cancel
                    </Text>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity className="flex-1 ml-3 bg-[#E29A7A] rounded-[20px] py-[8px] items-center">
                    <Text className="text-[24px] font-[RobotoBold] text-white">
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function OrderTab({ label, active, onPress }) {
    return (
        <View className="bg-[#FFFFFF] pl-[8px] py-[12px]">
            <TouchableOpacity
                onPress={onPress}
                className={`px-[6px] py-2  rounded-full mr-2 ${active ? "bg-[#9C5A3C]" : "bg-[#FFF7F3]"
                    }`}
            >
                <Text
                    className={`text-[13px] px-[10px] py-[5px] font-[Roboto] ${active ? "text-white" : "text-gray-500"
                        }`}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function ActionButton({ label, outlined }) {
    return (

        <TouchableOpacity
            className={`px-4 py-2 rounded-full ml-2 ${outlined
                ? "border border-gray-300  bg-white"
                : "bg-[#9C5A3C]"
                }`}
        >
            <Text
                className={`text-[13px] font-[RobotoMedium] ${outlined ? "text-gray-600 " : "text-white , bg-[#9C5A3C]"
                    }`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}


export default function OrdersScreen() {
    const [activeTab, setActiveTab] = useState("receive");

    return (
        <SafeAreaView className="flex-1 bg-[#DCEEF6]" edges={["bottom"]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 bg-[#FFFFFF] "
                >
                    {orderTabs.map(tab => (
                        <OrderTab
                            key={tab.key}
                            label={tab.label}
                            active={activeTab === tab.key}
                            onPress={() => setActiveTab(tab.key)}
                        />
                    ))}
                </ScrollView>
                <View className="px-[16px]">
                    {/* Orders */}
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </View>
            </ScrollView>
            <BottomActions />
        </SafeAreaView>
    );
}
