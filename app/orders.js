import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const orderTabs = ["All", "To Pay", "To Ship", "To Receive", "Refund"];

const sampleOrders = [
  {
    id: 1,
    vendorName: "Dauphin Pastoureau",
    status: "Shipped",
    statusColor: "#9F583C",
    items: [
      {
        id: 1,
        name: "Artisanal Avocado Oil Premium French Impo...",
        price: "$20.99",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      },
      {
        id: 2,
        name: "French Pastries Collection",
        price: "$20.83",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
      },
    ],
    deliveryInfo: "In Transit. Estimated delivery tomorrow",
    total: "$41.82",
  },
  {
    id: 2,
    vendorName: "Ethan's Bakery",
    status: "To Pay",
    statusColor: "#9F583C",
    items: [
      {
        id: 1,
        name: "Organic Bread Loaf",
        price: "$8.99",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      },
    ],
    deliveryInfo: "Pending payment confirmation",
    total: "$8.99",
  },
];

export default function YourOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("To Receive");

  const filteredOrders =
    activeTab === "All"
      ? sampleOrders
      : sampleOrders.filter(
          (order) =>
            order.status.toLowerCase().replace(" ", "") ===
            activeTab.toLowerCase().replace(" ", "")
        );

  return (
    <SafeAreaView className="flex-1 bg-[#c7dbed]">
      {/* Header */}
      <View className="bg-[#c7dbed] border-b border-[#b6c7d8] px-4 pb-3 pt-8 shadow-sm shadow-[#122430]/10">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className="rounded-full p-2"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-[20px] ml-4 font-semibold tracking-wide text-[#0f172a]">
              Your Orders
            </Text>
          </View>
          <TouchableOpacity className="rounded-full p-2">
            <Ionicons name="search-outline" size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="bg-[#c7dbed] px-4 py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {orderTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-[#9F583C]"
                  : "bg-white border border-[#e2e8f0]"
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-sm font-semibold ${
                  activeTab === tab ? "text-white" : "text-[#4b5563]"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView
        className="flex-1 bg-[#c7dbed]"
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 space-y-4">
          {filteredOrders.length === 0 ? (
            <View className="bg-white rounded-3xl px-6 py-12 items-center shadow-sm">
              <Ionicons name="cube-outline" size={64} color="#9fafbf" />
              <Text className="text-lg font-semibold text-[#4b5563] mt-4">
                No orders found
              </Text>
              <Text className="text-sm text-[#9ca3af] mt-2 text-center">
                You don't have any {activeTab.toLowerCase()} orders at the moment
              </Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View
                key={order.id}
                className="bg-white rounded-3xl px-4 py-4 shadow-sm shadow-[#122430]/10"
              >
                {/* Vendor Name and Status */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-bold text-[#0f172a]">
                    {order.vendorName}
                  </Text>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${order.statusColor}20` }}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: order.statusColor }}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>

                {/* Order Items */}
                <View className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <View
                      key={item.id}
                      className="flex-row items-center space-x-3"
                    >
                      <Image
                        source={{ uri: `${item.image}?auto=format&fit=crop&w=80&q=60` }}
                        className="w-16 h-16 rounded-2xl"
                        resizeMode="cover"
                      />
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-[#0f172a]">
                          {item.name}
                        </Text>
                        <Text className="text-sm font-bold text-[#9F583C] mt-1">
                          {item.price}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Delivery Info */}
                <View className="flex-row items-center space-x-2 mb-4">
                  <Ionicons name="car-outline" size={16} color="#6b7280" />
                  <Text className="text-xs text-[#6b7280]">
                    {order.deliveryInfo}
                  </Text>
                </View>

                {/* Total */}
                <View className="border-t border-[#e2e8f0] pt-3 mb-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-bold text-[#0f172a]">
                      Total
                    </Text>
                    <Text className="text-lg font-bold text-[#0f172a]">
                      {order.total}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity>
                    <Text className="text-sm font-semibold text-[#9F583C]">
                      More
                    </Text>
                  </TouchableOpacity>
                  <View className="flex-row space-x-3">
                    <TouchableOpacity className="px-4 py-2 bg-[#f3f4f6] rounded-full">
                      <Text className="text-sm font-semibold text-[#4b5563]">
                        Refund
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-4 py-2 rounded-full"
                      style={{ backgroundColor: order.statusColor }}
                    >
                      <Text className="text-sm font-semibold text-white">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] px-4 py-4 flex-row space-x-3">
        <TouchableOpacity className="flex-1 bg-[#f3f4f6] rounded-2xl py-4 items-center">
          <Text className="text-base font-semibold text-[#4b5563]">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-2xl py-4 items-center"
          style={{ backgroundColor: "#9F583C" }}
        >
          <Text className="text-base font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
