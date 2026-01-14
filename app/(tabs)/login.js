import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar style="dark" />

      <View className="bg-[#98C1D9] pb-5 pt-6 rounded-b-3xl">
        <Text className="text-center text-xl text-black font-montserrat">
          Log In
        </Text>
      </View>

      <View className="px-6 mt-12">
        <Text className="text-xs text-gray-600 font-opensans mb-1">
          Email
        </Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg px-3 py-3 mb-5"
          placeholder="alex.linderson@gmail.com"
        />

        <Text className="text-xs text-gray-600 font-opensans mb-1">
          Password
        </Text>
        <TextInput
          secureTextEntry
          className="bg-white border border-gray-300 rounded-lg px-3 py-3 mb-10"
          placeholder="********"
        />

        <TouchableOpacity
          className="bg-white rounded-2xl border border-gray-200 shadow-lg py-4 items-center"
          onPress={() => router.replace('/(tabs)/updates')}
        >
          <Text className="text-lg text-gray-900 font-montserrat">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
