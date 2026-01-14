import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
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

const { width, height } = Dimensions.get('window');

// Responsive scaling functions
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
  const [refreshing, setRefreshing] = useState(false);
  
  // --- STATE FOR MODAL ---
  const [modalVisible, setModalVisible] = useState(false);

  // --- STATE FOR SEARCH ---
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

  // --- FILTER LOGIC ---
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

  // --- RENDER FUNCTIONS ---
  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} activeOpacity={1}>
      <TouchableOpacity 
        style={styles.avatarContainer} 
        onPress={openProfileModal}
        activeOpacity={0.8}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name ? item.name.charAt(0) : '?'}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.occupation} numberOfLines={1}>{item.occupation}</Text>
            {item.subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
            ) : null}
          </View>
        </View>
        <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.topActionContainer}>
          <Feather name="shopping-cart" size={moderateScale(16)} color="#8B4513" style={styles.cartIcon} />
        </View>
        <View style={styles.middleStatusContainer}>
          {item.unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
            </View>
          ) : (
             <View style={{ height: scale(22) }} />
          )}
        </View>
        <View style={styles.bottomStatusContainer}>
          <Text style={styles.time}>{item.time}</Text>
          {item.isRead ? (
            <Icon name="check-all" size={moderateScale(16)} color="#3498DB" />
          ) : (
            <Icon name="check-all" size={moderateScale(16)} color="#B0B0B0" />
          )}
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
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={closeProfileModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderBackground} />
          <View style={styles.modalImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }} 
              style={styles.modalProfileImage} 
            />
            <View style={styles.verifiedBadge}>
              <Icon name="check-decagram" size={moderateScale(20)} color="#2ECC71" />
            </View>
          </View>
          <View style={styles.modalTextContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalName}>Annei Ellison</Text>
                    <Text style={styles.modalRoleRed}>Software Engineer at Rootkit Consultancy</Text>
                    <Text style={styles.modalRoleGray}>Other Occupations: UX Designer Product Manager</Text>
                </View>
                <View style={styles.brandLogoContainer}>
                    <Text style={styles.brandLogoText}>T</Text>
                </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* --- HEADER (Updated with Search) --- */}
      <View style={[
        styles.header, 
        { paddingTop: insets.top + verticalScale(10), height: verticalScale(65) + insets.top }
      ]}>
        {!isSearchActive ? (
          /* STANDARD VIEW */
          <>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="menu" size={moderateScale(24)} color="#1A1A2E" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Chat</Text>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="people-outline" size={moderateScale(22)} color="#1A1A2E" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setIsSearchActive(true)}
              >
                <Ionicons name="search" size={moderateScale(22)} color="#1A1A2E" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="notifications-circle-outline" size={moderateScale(24)} color="#1A1A2E" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* SEARCH VIEW */
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              onPress={() => {
                setIsSearchActive(false);
                setSearchQuery(''); 
              }}
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={moderateScale(24)} color="#1A1A2E" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
              returnKeyType="search"
            />
            
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.headerButton}>
                <Ionicons name="close-circle" size={moderateScale(20)} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChatList} // Using filtered data
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {renderProfileModal()}

      {/* Bottom Navigation */}
      <View style={[
        styles.bottomNav, 
        { paddingBottom: Math.max(insets.bottom, verticalScale(20)) }
      ]}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavSquare}>
            <Icon name="message-processing-outline" size={moderateScale(24)} color="#FFFFFF" />
          </View>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Ionicons name="bag-outline" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text style={styles.navLabel}>Occupation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Feather name="refresh-cw" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text style={styles.navLabel}>Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Feather name="phone" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text style={styles.navLabel}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Octicons name="person" size={moderateScale(24)} color="#1A1A2E" />
          </View>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8E9F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(8),
    backgroundColor: '#D8E9F0',
    borderBottomWidth: 1,
    borderBottomColor: '#B8D4E1',
  },
  headerButton: {
    padding: scale(8),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#1A1A2E',
    flex: 1,
    marginLeft: scale(10),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // --- NEW SEARCH STYLES ---
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(10),
    marginRight: scale(5),
    height: verticalScale(40),
    paddingRight: scale(5),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#1A1A2E',
    marginLeft: scale(5),
    paddingVertical: 0,
    height: '100%',
  },

  chatList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(12),
    width: '97%',
    alignSelf: 'center',
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },
  avatarContainer: {
    marginRight: scale(12),
    position: 'relative',
  },
  avatar: {
    width: scale(65),
    height: scale(65),
    borderRadius: scale(50),
    backgroundColor: '#8B4513',
    top: verticalScale(5),
    right: scale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(2),
  },
  nameContainer: {
    flex: 1,
    paddingRight: scale(5),
  },
  name: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  occupation: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#000',
    marginBottom: verticalScale(2),
  },
  subtitle: {
    fontSize: moderateScale(9),
    color: '#999',
    marginBottom: verticalScale(5),
  },
  message: {
    fontSize: moderateScale(12),
    color: '#6B7CD6',
    fontWeight: '500',
    marginTop: 0,
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: scale(65),
    paddingTop: 0,
    paddingBottom: verticalScale(5),
    paddingRight: scale(8),
  },
  topActionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  middleStatusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  bottomStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  cartIcon: {
    marginBottom: verticalScale(6),
    marginRight: scale(2),
  },
  unreadBadge: {
    backgroundColor: '#8B4513',
    borderRadius: moderateScale(11),
    minWidth: scale(22),
    height: scale(22),
    paddingHorizontal: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCountText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: 'bold',
  },
  time: {
    fontSize: moderateScale(10),
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: verticalScale(75), 
    paddingTop: verticalScale(10),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconContainer: {
    position: 'relative',
    marginBottom: verticalScale(4),
    height: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavSquare: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(14),
    backgroundColor: '#E08D79',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(4),
  },
  navLabel: {
    fontSize: moderateScale(11),
    color: '#1A1A2E',
    fontWeight: '500',
    marginBottom: verticalScale(2),
  },
  navLabelActive: {
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.75,
    backgroundColor: 'white',
    borderRadius: scale(25),
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeaderBackground: {
    height: verticalScale(140),
    width: '100%',
    backgroundColor: '#A0684F',
    position: 'absolute',
    top: 0,
  },
  modalImageContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    position: 'relative',
  },
  modalProfileImage: {
    width: scale(180),
    height: scale(180),
    borderRadius: scale(30),
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 1,
  },
  modalTextContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(25),
    paddingTop: verticalScale(10),
    backgroundColor: '#fff'
  },
  modalName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(4),
  },
  modalRoleRed: {
    fontSize: moderateScale(12),
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  modalRoleGray: {
    fontSize: moderateScale(11),
    color: '#666',
    lineHeight: verticalScale(16),
  },
  brandLogoContainer: {
    width: scale(30),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  brandLogoText: {
    fontSize: moderateScale(30),
    fontWeight: '900',
    color: '#6D4C41',
    fontFamily: 'serif',
  }
});

export default ChatListScreen;