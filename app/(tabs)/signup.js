import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar style="dark" />

      <View className="bg-[#98C1D9] pb-5 pt-4 rounded-b-3xl relative">
        <Pressable
          className="absolute left-5 top-5"
          hitSlop={12}
          onPress={() => router.back()}
        >
          <Text className="text-2xl text-black font-montserrat">X</Text>
        </Pressable>
        <Text className="text-center text-xl text-black font-montserrat">
          Sign Up
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 28,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-[24px] leading-8 text-black font-montserrat-bold">
          Create an account to{'\n'}continue
        </Text>

        <View className="mt-10">
          <Text className="text-xs text-gray-600 font-opensans mb-1">
            Full Name
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-800 font-montserrat"
            placeholder="Alex Linderson"
            placeholderTextColor="#A3A3A3"
          />
        </View>

        <View className="mt-5">
          <Text className="text-xs text-gray-600 font-opensans mb-1">
            Phone Number
          </Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-lg">
            <Pressable className="flex-row items-center px-3 py-3 border-r border-gray-200">
              <Text className="text-lg text-red-500 font-montserrat">+</Text>
              <Text className="text-lg text-gray-900 font-montserrat ml-1">
                4
              </Text>
            </Pressable>
            <TextInput
              className="flex-1 px-3 py-3 text-base text-gray-800 font-montserrat"
              placeholder="98 7654 3210"
              placeholderTextColor="#A3A3A3"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xs text-gray-600 font-opensans mb-1">
            Email Id
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-800 font-montserrat"
            placeholder="alex.linderson@gmail.com"
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-lg shadow-black/15 py-4 items-center"
          activeOpacity={0.85}
        >
          <Text className="text-lg text-gray-900 font-montserrat">Continue</Text>
        </TouchableOpacity>

        <View className="mt-6 items-center">
          <Text className="text-sm text-gray-700 font-opensans">
            Already have an account?{' '}
            <Text
              className="text-blue-600 font-opensans"
              onPress={() => router.back()}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
