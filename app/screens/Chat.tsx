import React, { useState, memo, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

// --- TYPES ---
export interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: Date;
  isRead?: boolean;
}

const CURRENT_USER_ID = 'mobile-user';

// --- THEME COLORS (Extracted from Image) ---
const COLORS = {
  background: '#D2E8F3',    // Light Blue Background
  headerBg: '#D2E8F3',      // Header blends with background
  bubbleMe: '#DFA899',      // Salmon/Brownish for outgoing
  bubbleOther: '#FFFFFF',   // White for incoming
  brownIcon: '#8B3E25',     // The brown color for Mic/Icons
  textGray: '#8E8E93',
  inputBg: '#F8F9FA'
};

// --- MOCK DATA ---
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hello ! Nazrul How are you?',
    senderId: 'other-user',
    createdAt: new Date(2026, 0, 15, 9, 30, 0), // 09:30 AM
    isRead: true,
  },
  {
    id: '2',
    text: 'You did your job well!',
    senderId: CURRENT_USER_ID,
    createdAt: new Date(2026, 0, 15, 9, 30, 0), // 09:30 AM
    isRead: true,
  },
  {
    id: '3',
    text: 'Hey! Where are you?',
    senderId: 'other-user',
    createdAt: new Date(2026, 0, 15, 9, 30, 0), // 09:30 AM
    isRead: true,
  },
  {
    id: '4',
    text: 'I am at work, and you?',
    senderId: CURRENT_USER_ID,
    createdAt: new Date(2026, 0, 15, 9, 30, 0), // 09:30 AM
    isRead: true,
  },
];

/* -------------------------------------------------------------------------- */
/* 1. MESSAGE ITEM                                                            */
/* -------------------------------------------------------------------------- */

type MessageItemProps = {
  item: Message;
  searchQuery?: string;
  isHighlighted?: boolean;
};

const MessageItem = memo(({ item, searchQuery, isHighlighted }: MessageItemProps) => {
  const isMine = item.senderId === CURRENT_USER_ID;

  const formatTime = (dateInput: Date) => {
    const date = new Date(dateInput);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours < 10 ? '0' + hours : hours;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${strHours}:${strMinutes} ${ampm}`;
  };

  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return <Text className={isMine ? 'font-bold text-gray-900' : 'font-bold text-gray-900'}>{text}</Text>;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
      <Text>
        {parts.map((part, index) => {
          if (part.toLowerCase() === query.toLowerCase()) {
            return (
              <Text key={index} className="bg-yellow-200 text-black font-bold">
                {part}
              </Text>
            );
          }
          return <Text key={index} className={isMine ? 'font-bold text-gray-900' : 'font-bold text-gray-900'}>{part}</Text>;
        })}
      </Text>
    );
  };

  return (
    <View className={`w-full mb-4 px-4 ${isHighlighted ? 'bg-yellow-100/30 -mx-4 px-8 py-2' : ''}`}>
      {/* Message Bubble Container */}
      <View className={`flex-row ${isMine ? 'justify-end' : 'justify-start'}`}>
        <View
          style={{ 
            backgroundColor: isMine ? COLORS.bubbleMe : COLORS.bubbleOther,
            maxWidth: '80%',
            borderRadius: 12,
            // Visually match the slightly squarer look in the image or keep standard rounded
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
          className="p-3 shadow-sm"
        >
          <Text className="text-[15px] leading-5 text-black font-bold">
            {searchQuery && item.text.toLowerCase().includes(searchQuery.toLowerCase())
              ? renderHighlightedText(item.text, searchQuery)
              : item.text}
          </Text>
        </View>
      </View>

      {/* Time Stamp (Outside Bubble) */}
      <View className={`mt-1 ${isMine ? 'items-end' : 'items-start'}`}>
        <Text className="text-[11px] text-gray-500 font-medium">
          {formatTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );
});

/* -------------------------------------------------------------------------- */
/* 2. DATE SEPARATOR (TODAY PILL)                                             */
/* -------------------------------------------------------------------------- */
const DateSeparator = () => (
  <View className="items-center my-4">
    <View className="bg-white px-4 py-1 rounded-lg shadow-sm">
      <Text className="text-xs font-bold text-black">Today</Text>
    </View>
  </View>
);

/* -------------------------------------------------------------------------- */
/* 3. MAIN CHAT COMPONENT                                                     */
/* -------------------------------------------------------------------------- */

const Chat = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const router = useRouter();

  // Extract chat information from route params
  const chatName = (params.chatName as string) || 'Majharul Haque';
  const chatOccupation = (params.chatOccupation as string) || 'Software Engineer at Rootkit';
  const chatAvatar = params.chatAvatar as string;

  // --- STATE ---
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

  // Refs
  const flatListRef = useRef<FlatList>(null);
  
  // --- SCROLL HELPER ---
  const scrollToBottom = useCallback(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  }, []);

  // --- SEARCH LOGIC ---
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = messages.filter((message) =>
      message.text.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);
    setCurrentSearchIndex(0);

    if (results.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const navigateSearchResult = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;

    let newIndex = currentSearchIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }

    setCurrentSearchIndex(newIndex);
  };

  // --- SEND TEXT MESSAGE ---
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      senderId: CURRENT_USER_ID,
      createdAt: new Date(),
      isRead: false,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInput('');
    scrollToBottom();
  };

  // --- RENDER HEADER ---
  const renderHeader = () => {
    if (isSearching) {
      return (
        <View style={{ backgroundColor: COLORS.headerBg }} className="flex-row items-center px-4 py-3 h-[60px]">
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <Icon name="arrow-left" size={26} color="#000" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center bg-white rounded-full mx-3 px-3 h-[40px]">
            <Icon name="magnify" size={20} color="#999" />
            <TextInput
              className="flex-1 ml-2 text-base text-black p-0"
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
              returnKeyType="search"
            />
          </View>
        </View>
      );
    }

    // Design-Matched Header
    return (
      <View 
        className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
      >
        {/* Left Section: Back Button + Profile + Info */}
        <View className="flex-row items-center flex-1">
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-3 p-1"
          >
            <Icon name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          
          {/* Profile Picture */}
          <View className="w-11 h-11 rounded-full overflow-hidden mr-3 bg-gray-200">
            {chatAvatar ? (
              <Image
                source={{ uri: chatAvatar }}
                className="w-full h-full"
              />
            ) : (
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                className="w-full h-full"
              />
            )}
          </View>
          
          {/* Name and Occupation */}
          <View className="flex-1">
            <Text className="text-[16px] font-bold text-black" numberOfLines={1}>
              {chatName}
            </Text>
            <Text className="text-[13px] text-gray-600" numberOfLines={1}>
              {chatOccupation}
            </Text>
          </View>
        </View>
        
        {/* Right Section: Three Dots Menu */}
        <TouchableOpacity 
          onPress={() => setIsSearching(true)}
          className="p-2"
        >
          <Icon name="dots-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {renderHeader()}

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            data={messages} 
            inverted
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
            // Add the "Today" pill at the visual top (bottom of list since inverted)
            ListFooterComponent={<DateSeparator />} 
            renderItem={({ item }) => (
              <MessageItem
                item={item}
                searchQuery={isSearching && searchQuery ? searchQuery : undefined}
                isHighlighted={
                  isSearching &&
                  searchResults.length > 0 &&
                  searchResults[currentSearchIndex]?.id === item.id
                }
              />
            )}
          />
        </View>

        {/* INPUT BAR (Nested containers matching the image) */}
        <View className="px-1 pb-12 pt-2 bg-transparent">
          {/* Outer White Container */}
          <View className="flex-row items-center bg-white rounded-[25px] px-4 py-4 shadow-sm">
            
            {/* Inner Grey/Off-white Container for Message Field */}
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-[25px] px-3 py-3 mr-2">
              
              {/* Wallet Icon */}
              <TouchableOpacity className="mr-2">
                <Icon name="credit-card-outline" size={24} color={COLORS.brownIcon} />
              </TouchableOpacity>

              {/* Input Field */}
              <TextInput
                className="flex-1 text-[15px] text-black"
                placeholder="Message"
                placeholderTextColor="#999"
                value={input}
                onChangeText={setInput}
              />
              
              {/* Attachment Icons inside the grey container */}
              <TouchableOpacity className="mx-2">
                <Icon name="paperclip" size={22} color={COLORS.brownIcon} />
              </TouchableOpacity>
              <TouchableOpacity className="ml-2 mr-1">
                <Icon name="camera-outline" size={22} color={COLORS.brownIcon} />
              </TouchableOpacity>
            </View>

            {/* Mic/Send Button - Outside grey container, inside white container */}
            {input.trim().length > 0 ? (
               <TouchableOpacity
               onPress={sendMessage}
               className="w-12 h-12 rounded-full items-center justify-center"
               style={{ backgroundColor: COLORS.brownIcon }}
             >
               <Icon name="send" size={22} color="white" />
             </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: COLORS.brownIcon }}
              >
                <Icon name="microphone" size={24} color="white" />
              </TouchableOpacity>
            )}

          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;