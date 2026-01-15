import { useRouter } from 'expo-router';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMemo, useState } from 'react';

const palette = {
  background: '#c7dce6',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
  border: '#e2e2e2',
};

export default function UpdatesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const posts = useMemo(
    () => [
      {
        id: 'p1',
        type: 'post',
        author: 'Alex Linderson',
        time: '2 hours ago',
        caption: 'I Love Sunnyside up eggs & artisan bread!',
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={26} color={palette.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Update</Text>
          <TouchableOpacity>
            <Feather name="more-vertical" size={22} color={palette.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.topBar}>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.pill, filter === 'all' && styles.pillActive]}
              onPress={() => setFilter('all')}>
              <Text style={[styles.pillText, filter === 'all' && styles.pillTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pill, filter === 'events' && styles.pillActive]}
              onPress={() => setFilter('events')}>
              <Text style={[styles.pillText, filter === 'events' && styles.pillTextActive]}>Events</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.postButton} onPress={() => router.push('/(tabs)/create-post')}>
            <Text style={styles.postButtonText}>Post</Text>
            <View style={styles.postAdd}>
              <AntDesign name="plus" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {filter === 'all' &&
          posts.map((post) => (
            <View key={post.id} style={styles.card}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>AL</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.author}>{post.author}</Text>
                  <Text style={styles.timestamp}>{post.time}</Text>
                </View>
                <Feather name="more-horizontal" size={20} color={palette.muted} />
              </View>

              <View style={styles.media}>
                <Image
                  source={require('@/assets/images/react-logo.png')}
                  style={styles.mediaImage}
                  resizeMode="cover"
                />
                <View style={styles.playButton}>
                  <AntDesign name="caretright" size={30} color="#fff" />
                </View>
              </View>

              <Text style={styles.caption}>{post.caption}</Text>
              <View style={styles.actionRow}>
                <View style={styles.actionGroup}>
                  <Feather name="heart" size={18} color={palette.muted} />
                  <Text style={styles.actionText}>Like</Text>
                </View>
                <View style={styles.actionGroup}>
                  <Feather name="message-circle" size={18} color={palette.muted} />
                  <Text style={styles.actionText}>Chat</Text>
                </View>
                <View style={styles.actionGroup}>
                  <Feather name="share-2" size={18} color={palette.muted} />
                  <Text style={styles.actionText}>Share</Text>
                </View>
                <View style={styles.actionGroup}>
                  <Feather name="bookmark" size={18} color={palette.muted} />
                  <Text style={styles.actionText}>Save</Text>
                </View>
              </View>
            </View>
          ))}

        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventLabel}>Event</Text>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventCardBody}>
            <Text style={styles.eventTitle}>Design Thinking Workshop</Text>
            <View style={styles.eventMetaRow}>
              <MaterialIcons name="event" size={18} color={palette.muted} />
              <Text style={styles.eventMeta}>Wed, Oct 26, 10:00 am</Text>
            </View>
            <View style={styles.eventMetaRow}>
              <MaterialIcons name="language" size={18} color={palette.muted} />
              <Text style={styles.eventMeta}>Online</Text>
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f4f8fa',
  },
  pillActive: {
    backgroundColor: palette.card,
    borderColor: palette.accent,
  },
  pillText: {
    fontSize: 13,
    color: palette.text,
    fontWeight: '700',
  },
  pillTextActive: {
    color: palette.accent,
  },
  postButton: {
    backgroundColor: palette.accent,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  postAdd: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8a9cab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  author: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  timestamp: {
    fontSize: 12,
    color: palette.muted,
  },
  media: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#d0d9de',
  },
  playButton: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    backgroundColor: palette.accent,
    padding: 14,
    borderRadius: 32,
  },
  caption: {
    fontSize: 15,
    color: palette.text,
    paddingHorizontal: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    color: palette.muted,
    fontWeight: '700',
  },
  eventCard: {
    backgroundColor: '#dbe6ed',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.muted,
  },
  eventCardBody: {
    gap: 6,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMeta: {
    fontSize: 13,
    color: palette.muted,
  },
  rsvpButton: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accent,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },
  rsvpText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

