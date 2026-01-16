import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Image,
    TextInput
} from 'react-native';

// --- IMPORTS FOR EXPO ---
import {
    Feather,
    MaterialCommunityIcons as Icon,
    Ionicons,
    Octicons
} from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
// Import styled for NativeWind if using v4, otherwise className works automatically in v2/v3 via babel plugin
// If you are using NativeWind v4, ensure you import css interop or similar if needed, 
// but for standard v2/v3 setups, the className prop is sufficient.

const { width, height } = Dimensions.get('window');

// --- RESPONSIVE SCALING UTILITIES ---
// Kept these to maintain the exact responsive behavior of the original design
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

interface ChatItem {
  id: string;
  name: string;
  occupation: string;
  subtitle: string;
  message: string;
  time: string;
  unreadCount: number;
  avatar?: string;
  isRead: boolean;
}

const ChatListScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [chatList, setChatList] = useState<ChatItem[]>([
    {
      id: '1',
      name: 'Hello Linderson',
      occupation: 'Software Engineer at Rootkit Consultancy',
      subtitle: 'Food Engineer · Technical Writer',
      message: 'Have a good day.',
      time: '2 min ago',
      unreadCount: 3,
      isRead: false,
    },
    {
      id: '2',
      name: 'Alex Linderson',
      occupation: 'Software Engineer at Rootkit Consultancy',
      subtitle: 'Food Engineer · Technical Writer',
      message: 'Lets start new design project.',
      time: '2 min ago',
      unreadCount: 0,
      isRead: true,
    },
  ]);

  const filteredChatList = chatList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
          });

          if (data.length > 0) {
            const formattedContacts: ChatItem[] = data
              .filter(c => c.name) 
              .map((contact) => ({
                id: contact.id || Math.random().toString(),
                name: contact.name,
                occupation: 'Mobile Contact', 
                subtitle: contact.phoneNumbers?.[0]?.number || 'No number',
                message: 'Tap to send a message',
                time: '',
                unreadCount: 0,
                isRead: true,
              }));
            setChatList(prev => [...prev, ...formattedContacts]);
          }
        }
      } catch (error) {
        console.log('Error fetching contacts', error);
      }
    })();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const openProfileModal = () => setModalVisible(true);
  const closeProfileModal = () => setModalVisible(false);

  // --- RENDER ITEMS ---

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      className="flex-row bg-white self-center border-0 shadow-none"
      style={{ 
        width: '97%', 
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(12) 
      }} 
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: '/screens/Chat',
          params: {
            chatId: item.id,
            chatName: item.name,
            chatOccupation: item.occupation,
            chatSubtitle: item.subtitle,
            chatAvatar: item.avatar || '',
          }
        });
      }}
    >
      {/* Avatar */}
      <TouchableOpacity 
        onPress={openProfileModal}
        activeOpacity={0.8}
        className="relative bg-[#8B4513] items-center justify-center rounded-full"
        style={{
            marginRight: scale(12),
            width: scale(65),
            height: scale(65),
            top: verticalScale(5),
            right: scale(2)
        }}
      >
        <Text 
          className="font-bold text-white"
          style={{ fontSize: moderateScale(24) }}
        >
          {item.name ? item.name.charAt(0) : '?'}
        </Text>
      </TouchableOpacity>

      {/* Content */}
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-center mb-[2px]">
          <View className="flex-1 pr-1">
            <Text 
              className="font-bold text-[#1A1A2E]"
              style={{ fontSize: moderateScale(14) }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text 
              className="font-semibold text-black"
              style={{ 
                  fontSize: moderateScale(10),
                  marginBottom: verticalScale(2)
               }}
              numberOfLines={1}
            >
              {item.occupation}
            </Text>
            {item.subtitle ? (
              <Text 
                className="text-[#999]"
                style={{ 
                    fontSize: moderateScale(9),
                    marginBottom: verticalScale(5)
                }} 
                numberOfLines={1}
              >
                {item.subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        <Text 
          className="font-medium text-[#6B7CD6] mt-0"
          style={{ fontSize: moderateScale(12) }} 
          numberOfLines={1}
        >
          {item.message}
        </Text>
      </View>

      {/* Right Section */}
      <View 
        className="justify-between items-end pb-[5px] pr-2"
        style={{ width: scale(65) }}
      >
        <View className="items-end justify-start">
          <Feather 
            name="shopping-cart" 
            size={moderateScale(16)} 
            color="#8B4513" 
            style={{ marginBottom: verticalScale(6), marginRight: scale(2) }} 
          />
        </View>
        <View className="items-end justify-center flex-1">
          {item.unreadCount > 0 ? (
            <View 
              className="bg-[#8B4513] items-center justify-center rounded-xl"
              style={{ 
                  minWidth: scale(22), 
                  height: scale(22), 
                  paddingHorizontal: scale(5) 
               }}
            >
              <Text 
                className="text-white font-bold"
                style={{ fontSize: moderateScale(11) }}
              >
                {item.unreadCount}
              </Text>
            </View>
          ) : (
             <View style={{ height: scale(22) }} />
          )}
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-[#999]" style={{ fontSize: moderateScale(10) }}>
            {item.time}
          </Text>
          <Icon 
            name="check-all" 
            size={moderateScale(16)} 
            color={item.isRead ? "#3498DB" : "#B0B0B0"} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProfileModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeProfileModal}
    >
      <TouchableOpacity 
        className="flex-1 justify-center items-center bg-black/40"
        activeOpacity={1} 
        onPress={closeProfileModal}
      >
        <View 
          className="bg-white overflow-hidden shadow-xl elevation-5"
          style={{ 
              width: width * 0.75, 
              borderRadius: scale(25) 
           }}
        >
          <View 
            className="w-full absolute top-0 bg-[#A0684F]" 
            style={{ height: verticalScale(140) }}
          />
          <View 
            className="self-center relative"
            style={{ 
                marginTop: verticalScale(30), 
                marginBottom: verticalScale(10) 
            }}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }} 
              className="border-4 border-white"
              style={{ 
                  width: scale(180), 
                  height: scale(180), 
                  borderRadius: scale(30) 
              }} 
            />
            <View 
              className="absolute bg-white rounded-full p-[1px]"
              style={{ top: scale(10), right: scale(10) }}
            >
              <Icon name="check-decagram" size={moderateScale(20)} color="#2ECC71" />
            </View>
          </View>
          <View 
            className="bg-white"
            style={{ 
                paddingHorizontal: scale(20), 
                paddingBottom: verticalScale(25), 
                paddingTop: verticalScale(10) 
            }}
          >
            <View className="flex-row justify-between items-start">
                <View className="flex-1">
                    <Text 
                        className="font-bold text-black"
                        style={{ fontSize: moderateScale(18), marginBottom: verticalScale(4) }}
                    >
                        Annei Ellison
                    </Text>
                    <Text 
                        className="font-semibold text-[#8B4513]"
                        style={{ fontSize: moderateScale(12), marginBottom: verticalScale(4) }}
                    >
                        Software Engineer at Rootkit Consultancy
                    </Text>
                    <Text 
                        className="text-[#666]"
                        style={{ fontSize: moderateScale(11), lineHeight: verticalScale(16) }}
                    >
                        Other Occupations: UX Designer Product Manager
                    </Text>
                </View>
                <View 
                    className="justify-center items-center"
                    style={{ width: scale(30), height: scale(40), marginLeft: scale(10) }}
                >
                    <Text 
                        className="font-black text-[#6D4C41]"
                        style={{ fontSize: moderateScale(30), fontFamily: 'serif' }}
                    >
                        T
                    </Text>
                </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View className="flex-1 bg-[#D8E9F0]">
      {/* --- HEADER --- */}
      <View 
        className="flex-row items-center justify-between border-b border-[#B8D4E1] bg-[#D8E9F0]"
        style={{ 
            paddingTop: insets.top + verticalScale(10), 
            height: verticalScale(65) + insets.top,
            paddingHorizontal: scale(15),
            paddingBottom: verticalScale(8)
        }}
      >
        {!isSearchActive ? (
          <>
            <TouchableOpacity className="p-2">
              <Icon name="menu" size={moderateScale(24)} color="#1A1A2E" />
            </TouchableOpacity>

            <Text 
                className="flex-1 font-bold text-[#1A1A2E]"
                style={{ fontSize: moderateScale(20), marginLeft: scale(10) }}
            >
                Chat
            </Text>

            <View className="flex-row items-center">
              <TouchableOpacity className="p-2">
                <Ionicons name="people-outline" size={moderateScale(22)} color="#1A1A2E" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="p-2"
                onPress={() => setIsSearchActive(true)}
              >
                <Ionicons name="search" size={moderateScale(22)} color="#1A1A2E" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <Ionicons name="notifications-circle-outline" size={moderateScale(24)} color="#1A1A2E" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* SEARCH VIEW */
          <View 
            className="flex-1 flex-row items-center bg-white rounded-xl mr-1 pr-1"
            style={{ height: verticalScale(40) }}
          >
            <TouchableOpacity 
              onPress={() => {
                setIsSearchActive(false);
                setSearchQuery(''); 
              }}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={moderateScale(24)} color="#1A1A2E" />
            </TouchableOpacity>
            
            <TextInput
              className="flex-1 h-full text-[#1A1A2E] p-0"
              style={{ fontSize: moderateScale(14), marginLeft: scale(5) }}
              placeholder="Search contacts..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
              returnKeyType="search"
            />
            
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="p-2">
                <Ionicons name="close-circle" size={moderateScale(20)} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChatList}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        className="flex-1 bg-transparent"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {renderProfileModal()}

      {/* Bottom Navigation */}
      <View 
        className="flex-row justify-around items-center bg-white border-t border-black/5 shadow-sm elevation-5"
        style={{ 
            minHeight: verticalScale(75), 
            paddingTop: verticalScale(10),
            paddingBottom: Math.max(insets.bottom, verticalScale(20)) 
        }}
      >
        <TouchableOpacity className="items-center justify-center flex-1">
          <View 
            className="bg-[#E08D79] items-center justify-center"
            style={{ 
                width: scale(45), 
                height: scale(45), 
                borderRadius: scale(14),
                marginBottom: verticalScale(4)
            }}
          >
            <Icon name="message-processing-outline" size={moderateScale(24)} color="#FFFFFF" />
          </View>
          <Text 
            className="font-bold text-[#1A1A2E]"
            style={{ fontSize: moderateScale(11) }}
          >
            Chats
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center flex-1">
          <View 
            className="justify-center items-center relative"
            style={{ height: moderateScale(24), marginBottom: verticalScale(4) }}
          >
            <Ionicons name="bag-outline" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text 
            className="font-medium text-[#1A1A2E]"
            style={{ fontSize: moderateScale(11), marginBottom: verticalScale(2) }}
          >
            Occupation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center flex-1">
          <View 
            className="justify-center items-center relative"
            style={{ height: moderateScale(24), marginBottom: verticalScale(4) }}
          >
            <Feather name="refresh-cw" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text 
            className="font-medium text-[#1A1A2E]"
            style={{ fontSize: moderateScale(11), marginBottom: verticalScale(2) }}
          >
            Updates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center flex-1">
          <View 
             className="justify-center items-center relative"
             style={{ height: moderateScale(24), marginBottom: verticalScale(4) }}
          >
            <Feather name="phone" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text 
             className="font-medium text-[#1A1A2E]"
             style={{ fontSize: moderateScale(11), marginBottom: verticalScale(2) }}
          >
            Contact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center flex-1">
          <View 
            className="justify-center items-center relative"
            style={{ height: moderateScale(24), marginBottom: verticalScale(4) }}
          >
            <Octicons name="person" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text 
            className="font-medium text-[#1A1A2E]"
            style={{ fontSize: moderateScale(11), marginBottom: verticalScale(2) }}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatListScreen;