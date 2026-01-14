import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#9CCBE4]">
      <StatusBar style="dark" />

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-black text-lg font-semibold mb-3">
          Welcome to
        </Text>

        <Text className="text-black text-5xl font-extrabold mb-10">
          CONNECT
        </Text>

        <Text className="text-black text-center text-xl leading-8">
          Expand your professional{'\n'}
          circle and find new{'\n'}
          opportunities
        </Text>
      </View>

      <View className="pb-12 px-8">
        <TouchableOpacity
          className="bg-white rounded-2xl py-4 items-center"
          onPress={() => router.replace('/(tabs)/explore')}
        >
          <Text className="text-black text-xl">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
