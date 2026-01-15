import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#98C1D9]">
      <StatusBar style="dark" />

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-black text-lg font-semibold mb-3 font-montserrat">
          Welcome to
        </Text>

        <Text className="text-black text-5xl font-extrabold tracking-tight mb-10 font-montserrat-bold">
          CONNECT
        </Text>

        <Text className="text-black text-center text-xl font-semibold leading-8 px-6 font-opensans">
          Expand your professional{'\n'}
          circle and find new{'\n'}
          opportunities
        </Text>
      </View>

      <View className="pb-12 px-8">
        <TouchableOpacity
          className="bg-white rounded-2xl py-4 px-10 shadow-lg items-center"
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/auth-options')}
        >
          <Text className="text-black text-xl font-thin font-montserrat">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
