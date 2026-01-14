import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreatePost() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#D9EDF6] px-4 pt-12">

      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold">Create Post</Text>
      </View>

      {/* Upload */}
      <View className="items-center mb-8">
        <Text className="text-gray-600 mb-3">
          Add photos, videos or files
        </Text>

        <TouchableOpacity className="bg-[#A76443] px-6 py-3 rounded-full">
          <Text className="text-white">Upload from Gallery</Text>
        </TouchableOpacity>

        <Text className="text-gray-400 mt-2">or Files</Text>
      </View>

      {/* Title */}
      <Text className="mb-1 text-gray-600">Title</Text>
      <TextInput className="bg-white rounded-full px-4 py-3 mb-4" />

      {/* Description */}
      <Text className="mb-1 text-gray-600">Description</Text>
      <TextInput
        multiline
        className="bg-white rounded-2xl px-4 py-3 h-28 mb-4"
        placeholder="Tell us more bout your item..."
      />

      {/* AI Button */}
      <TouchableOpacity className="self-start bg-[#A76443] px-4 py-2 rounded-full mb-8">
        <Text className="text-white">Rewrite with AI</Text>
      </TouchableOpacity>

      {/* Create */}
      <TouchableOpacity className="bg-[#A76443] py-4 rounded-full">
        <Text className="text-white text-center text-lg font-semibold">
          Create Post
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
