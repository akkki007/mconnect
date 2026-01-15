import { useRouter } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const palette = {
  background: '#c7dce6',
  card: '#f7f7f7',
  accent: '#c67852',
  text: '#1f1f1f',
  muted: '#6b6b6b',
  border: '#e0e0e0',
};

export default function CreatePostScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={22} color={palette.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={20} color={palette.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.uploadBox}>
          <Text style={styles.uploadTitle}>Add photos, videos or files</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
          </TouchableOpacity>
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or Files</Text>
            <View style={styles.orLine} />
          </View>
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput placeholder="" placeholderTextColor={palette.muted} style={styles.input} />

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Tell us more bout your item....."
          placeholderTextColor={palette.muted}
          style={[styles.input, styles.textarea]}
          multiline
        />

        <TouchableOpacity style={styles.aiButton}>
          <AntDesign name="android1" size={16} color="#fff" />
          <Text style={styles.aiText}>Rewrite with AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={() => router.back()}>
          <Text style={styles.submitText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    alignSelf: 'flex-start',
    marginLeft: -6,
  },
  content: {
    gap: 18,
  },
  uploadBox: {
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  uploadTitle: {
    fontSize: 16,
    color: palette.text,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: palette.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -2,
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#b4c0c7',
  },
  orText: {
    fontSize: 12,
    color: palette.muted,
  },
  label: {
    fontSize: 15,
    color: palette.text,
    fontWeight: '700',
    marginTop: 4,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: palette.text,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c5d0d6',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c5d0d6',
  },
  aiButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#a05d42',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#9a573d',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

