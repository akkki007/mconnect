import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

const palette = {
  background: '#cfe1e7',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

export default function ContactsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Feather name="users" size={28} color={palette.text} />
        </View>
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>Manage your connections here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  iconWrap: {
    backgroundColor: '#e3edf1',
    padding: 14,
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  subtitle: {
    fontSize: 13,
    color: palette.muted,
    textAlign: 'center',
  },
});

