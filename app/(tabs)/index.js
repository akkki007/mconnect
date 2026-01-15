import { Feather, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const palette = {
  background: '#cfe1e7',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

const CHATS = [
  { name: 'Alex Linderson', message: 'Designs look great, thanks!' },
  { name: 'Marvin Lee', message: 'Can you send the file?' },
  { name: 'Mia Raymond', message: 'Meeting moved to 3 pm.' },
  { name: 'Scott Powell', message: 'Copy that.' },
];

export default function ChatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
          <Feather name="more-horizontal" size={22} color={palette.text} />
        </View>

        <View style={styles.searchRow}>
          <MaterialIcons name="search" size={18} color={palette.muted} />
          <TextInput placeholder="Search" placeholderTextColor={palette.muted} style={styles.input} />
          <MaterialIcons name="filter-list" size={20} color={palette.muted} />
        </View>

        <View style={styles.list}>
          {CHATS.map((chat) => (
            <View key={chat.name} style={styles.chatRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{chat.name.slice(0, 2).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatMessage}>{chat.message}</Text>
              </View>
              <TouchableOpacity style={styles.chatBadge}>
                <Text style={styles.chatBadgeText}>Chat</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e3edf1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: palette.text,
  },
  list: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8a9cab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  chatName: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  chatMessage: {
    fontSize: 12,
    color: palette.muted,
  },
  chatBadge: {
    backgroundColor: palette.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  chatBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
