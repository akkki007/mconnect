import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={24} style={{ marginBottom: 1 }} {...props} />;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9C5A3C",
        tabBarInactiveTintColor: "gray",

        headerShown: true,

        headerStyle: {
          backgroundColor: "#DCEEF6",
        },

        headerShadowVisible: false,

        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto_500Medium",
          fontSize: 20,
          color: "#1F2937",
        },
      }}
    >


      <Tabs.Screen
        name="index"
        options={{
          title: 'Profile',
          headerTitle: 'Profile Settings',
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            color: "#1F2937",
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerLeft: () => (
            <Pressable
              className="ml-4"
              onPress={() => {
                router.back();
              }}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable className="mr-4">
              <Ionicons name="settings-outline" size={24} color="#1F2937" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile-settings"
        options={{
          title: 'Settings',
          headerTitle: 'Profile Settings',
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            color: "#1F2937",
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color="black" />,
          headerLeft: () => (
            <Pressable
              className="ml-4"
              onPress={() => {
                router.back();
              }}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),

          headerRight: () => (
            <View className="mr-4" />
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          headerTitle: 'Connections',
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            color: "#1F2937",
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color="black" />,
          headerLeft: () => (
            <Pressable
              className="ml-4"
              onPress={() => {
                router.back();
              }}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),

          headerRight: () => (
            <>
              <Pressable className="mr-4">
                <Ionicons name="search" size={22} color="#1F2937" />
              </Pressable>

            </>
          ),
        }}
      />
      <Tabs.Screen
        name="vendors"
        options={{
          title: "Vendors List",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 20,
            color: "#1F2937",
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color="black" />,
          headerLeft: () => (
            <Pressable className="ml-4">
              <Ionicons name="menu" size={24} color="#1F2937" />
            </Pressable>
          ),
          headerRight: () => (
            <>
              <Pressable className="mr-4">
                <Ionicons name="search" size={24} color="#1F2937" />
              </Pressable>
              <Pressable className="mr-4">
                <Ionicons name="notifications" size={24} color="#1F2937" />
              </Pressable>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Your Orders",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#DCEEF6",
          },
          headerLeft: () => (
            <Pressable className="ml-4">
              <Ionicons name="chevron-back" size={24} color="#1F2937" />
            </Pressable>
          ),
          headerRight: () => (
            <>
              <Pressable className="mr-4">
                <Ionicons name="search" size={24} color="#1F2937" />
              </Pressable>

            </>
          ),
        }}
      />


    </Tabs>
  );
}
