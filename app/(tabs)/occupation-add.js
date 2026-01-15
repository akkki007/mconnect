import { useRouter, useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const palette = {
  background: '#c7dce6',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

const CURRENT = ['Plumber', 'Veg Vendor', 'Home Cook', 'English Teacher'];

export default function OccupationAddScreen() {
  const router = useRouter();
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="menu" size={24} color={palette.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Occupation</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/occupation')}>
            <MaterialIcons name="add" size={22} color={palette.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {CURRENT.map((item, idx) => (
            <View key={item} style={[styles.row, idx < CURRENT.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    paddingTop: 24,
    paddingBottom: 40,
    gap: 28,
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
  card: {
    backgroundColor: palette.card,
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    paddingHorizontal: 14,
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
  saveButton: {
    alignSelf: 'center',
    backgroundColor: palette.accent,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 18,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

