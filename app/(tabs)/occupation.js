import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const palette = {
  background: '#c7dce6',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

const RECENT = ['Plumber', 'Veg Vendor', 'Home Cook', 'English Teacher'];

export default function OccupationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialIcons name="menu" size={24} color={palette.text} />
          <Text style={styles.headerTitle}>Occupation</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/occupation-search')}>
              <MaterialIcons name="search" size={22} color={palette.text} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={18} color={palette.card} />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <Text style={styles.foundText}>45 found</Text>
        </View>

        <View style={styles.card}>
          {RECENT.map((item, idx) => (
            <View key={item} style={[styles.row, idx < RECENT.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.mutedLabel}>Suggestions</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/occupation-add')}>
          <Text style={styles.addButtonText}>Add Occupation</Text>
          <MaterialIcons name="add" size={18} color="#fff" />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#25384a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  foundText: {
    fontSize: 13,
    color: palette.muted,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  rowText: {
    fontSize: 18,
    color: palette.text,
    fontWeight: '700',
  },
  mutedLabel: {
    fontSize: 15,
    color: palette.text,
    textAlign: 'center',
    marginTop: 4,
  },
  addButton: {
    marginTop: 6,
    backgroundColor: palette.accent,
    borderRadius: 16,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

