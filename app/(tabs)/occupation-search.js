import { useRouter, useNavigation } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const palette = {
  background: '#c7dce6',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

const CATEGORIES = [
  { label: 'Shopping', icon: 'shopping' },
  { label: 'Health care', icon: 'hospital-box' },
  { label: 'School', icon: 'school' },
  { label: 'Construction', icon: 'office-building' },
  { label: 'Public Service', icon: 'domain' },
  { label: 'Restaurants', icon: 'food-fork-drink' },
];

export default function OccupationSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  // Hide tab bar while this screen is focused
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => parent?.setOptions({ tabBarStyle: undefined });
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={22} color={palette.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Occupation</Text>
          <TouchableOpacity onPress={() => setQuery('')}>
            <MaterialIcons name="search" size={22} color={palette.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent searches</Text>
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.link}>Erase everything</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <MaterialIcons name="access-time" size={20} color={palette.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Test"
            placeholderTextColor={palette.muted}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <MaterialIcons name="close" size={20} color={palette.muted} />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text style={styles.categoriesLabel}>Categories :</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((item) => (
              <View key={item.label} style={styles.categoryRow}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons name={item.icon} size={22} color="#fff" />
                </View>
                <Text style={styles.categoryText}>{item.label}</Text>
              </View>
            ))}
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.text,
  },
  link: {
    fontSize: 12,
    color: '#2f7be5',
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b8c7cf',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: palette.text,
    paddingVertical: 4,
  },
  categoriesLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 10,
  },
  categoriesGrid: {
    gap: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: palette.text,
  },
});

