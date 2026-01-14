import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UpdatesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#CAE5F0]">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-4 pt-3 pb-4">
          <View className="flex-row items-center">
            <Ionicons name="menu" size={22} color="#000" />
            <Text className="ml-2.5 text-[16px] font-medium text-black">
              Update
            </Text>
          </View>
        </View>

        {/* FILTER PILLS & POST BUTTON */}
        <View className="flex-row items-center justify-between px-4 mb-3">
          <View className="flex-row">
            <TouchableOpacity className="bg-white px-4 py-1.5 rounded-full mr-2 border border-blue-100 shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
              <Text className="text-black text-[13px] font-medium">All</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white px-4 py-1.5 rounded-full border border-blue-100 shadow-sm" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
              <Text className="text-black text-[13px] font-medium">Events</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-[#A76443] px-3.5 py-1.5 rounded-full"
            onPress={() => router.push('/(tabs)/create-post')}
          >
            <Text className="text-white text-[13px] font-medium mr-0.5">Post</Text>
            <Ionicons name="add" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* POST CARD */}
        <View className="mx-4 bg-white rounded-xl overflow-hidden mb-3" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>

          {/* USER HEADER */}
          <View className="flex-row items-center justify-between px-3 py-2.5">
            <View className="flex-row items-center">
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                className="w-9 h-9 rounded-full"
              />
              <Text className="ml-2.5 text-[14px] font-medium text-black">
                Alex Linderson
              </Text>
            </View>

            <Ionicons name="ellipsis-vertical" size={16} color="#444" />
          </View>

          {/* POST IMAGE WITH PLAY BUTTON */}
          <View className="relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1501183638710-841dd1904471' }}
              className="w-full h-56"
              resizeMode="cover"
            />

            {/* PLAY ICON OVERLAY */}
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-14 h-14 rounded-full bg-white/95 items-center justify-center">
                <View className="w-12 h-12 rounded-full border-2 border-[#D4876C] items-center justify-center">
                  <Ionicons name="play" size={22} color="#D4876C" style={{ marginLeft: 2 }} />
                </View>
              </View>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View className="flex-row justify-between items-center px-3 py-3">
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={22} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="repeat" size={22} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* EVENT CARD */}
        <View className="mx-4 bg-[#DBE9EE] rounded-xl px-4 py-3.5 mb-24" style={{ elevation: 1 }}>

          <Text className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-medium">
            Event
          </Text>

          <Text className="text-[15px] font-bold text-black mb-3">
            Design Thinking Workshop
          </Text>

          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={14} color="#333" />
            <Text className="ml-1.5 text-[12px] text-gray-800 font-medium">
              Wed, Oct 26, 10:00 am
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="videocam-outline" size={14} color="#333" />
              <Text className="ml-1.5 text-[12px] text-gray-800 font-medium">Online</Text>
            </View>

            <TouchableOpacity className="bg-[#D4876C] px-6 py-1.5 rounded-full shadow-sm">
              <Text className="text-white text-[13px] font-bold">RSVP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION BAR */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pt-1 pb-2 rounded-t-[20px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 10 }}>
        <View className="flex-row justify-around items-end px-2 h-14">

          {/* Chats */}
          <TouchableOpacity className="items-center justify-center flex-1 pb-2">
            <Ionicons name="chatbubble-outline" size={24} color="#999" />
            <Text className="text-[10px] mt-1 text-gray-400 font-medium">Chats</Text>
          </TouchableOpacity>

          {/* Occupation */}
          <TouchableOpacity className="items-center justify-center flex-1 pb-2">
            <Ionicons name="briefcase-outline" size={24} color="#999" />
            <Text className="text-[10px] mt-1 text-gray-400 font-medium">Occupation</Text>
          </TouchableOpacity>

          {/* Updates - Active/Center */}
          <View className="items-center flex-1 relative bottom-4">
            <View className="bg-[#D4876C] w-14 h-14 rounded-full items-center justify-center shadow-lg" style={{ shadowColor: '#D4876C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 }}>
              <Ionicons name="refresh" size={26} color="white" />
            </View>
            <Text className="text-[10px] mt-1 text-[#D4876C] font-semibold">Updates</Text>
          </View>

          {/* Contacts */}
          <TouchableOpacity className="items-center justify-center flex-1 pb-2">
            <Ionicons name="call-outline" size={24} color="#999" />
            <Text className="text-[10px] mt-1 text-gray-400 font-medium">Contacts</Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity className="items-center justify-center flex-1 pb-2">
            <Ionicons name="person-outline" size={24} color="#999" />
            <Text className="text-[10px] mt-1 text-gray-400 font-medium">Profile</Text>
          </TouchableOpacity>

        </View>
      </View>

    </SafeAreaView>
  );
}