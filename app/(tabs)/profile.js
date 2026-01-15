import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

const palette = {
  background: '#cfe1e7',
  text: '#1f1f1f',
  muted: '#6b6b6b',
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Feather name="user" size={26} color="#fff" />
        </View>
        <Text style={styles.name}>Alex Linderson</Text>
        <Text style={styles.subtitle}>View and edit your profile.</Text>
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
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8a9cab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  subtitle: {
    fontSize: 13,
    color: palette.muted,
  },
});

