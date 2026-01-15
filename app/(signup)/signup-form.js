import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupFormScreen() {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates?.height ?? 0)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const buttonBottom = keyboardHeight > 0 ? keyboardHeight + 16 : 64;

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar style="dark" />

      <View className="flex-1">
        <View className="bg-[#9EC6DF] pb-4 pt-4 relative items-center">
          <Pressable
            className="absolute left-5 top-3 h-10 w-10 items-center justify-center"
            hitSlop={12}
            onPress={() => router.back()}
          >
            <Text className="text-2xl text-black font-montserrat">X</Text>
          </Pressable>
          <Text className="text-lg text-black font-montserrat">Sign Up</Text>
        </View>

        <ScrollView
          className="flex-1 mt-36"
          contentContainerStyle={{
            paddingHorizontal: 28,
            paddingTop: 30,
            paddingBottom: 220,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-center text-[24px] leading-8 text-black font-montserrat-bold">
            Create an account to{'\n'}continue
          </Text>

          <View className="mt-10">
            <Text className="text-xs text-[#555] font-opensans mb-1">
              Full Name
            </Text>
            <TextInput
              className="bg-white border border-[#2B2B2B] rounded-xl px-3.5 py-3 text-base text-gray-900 font-montserrat"
              placeholder="Alex Linderson"
              placeholderTextColor="#A6A6A6"
            />
          </View>

          <View className="mt-5">
            <Text className="text-xs text-[#555] font-opensans mb-1">
              Phone Number
            </Text>
            <View className="flex-row items-center bg-white border border-[#2B2B2B] rounded-xl">
              <Pressable className="flex-row items-center px-3.5 py-3 border-r border-[#D8D8D8]">
                <Text className="text-lg text-[#E53A38] font-montserrat mr-0.5">
                  +
                </Text>
                <Text className="text-lg text-gray-900 font-montserrat">91</Text>
                <Text className="text-base text-gray-600 font-opensans ml-2">
                  ▾
                </Text>
              </Pressable>
              <TextInput
                className="flex-1 px-3.5 py-3 text-[4vw] text-gray-900 font-montserrat"
                placeholder="98 7654 3210"
                placeholderTextColor="#A6A6A6"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View className="mt-5">
            <Text className="text-xs text-[#555] font-opensans mb-1">
              Email Id
            </Text>
            <TextInput
              className="bg-white border border-[#2B2B2B] rounded-xl px-3.5 py-3 text-base text-gray-900 font-montserrat"
              placeholder="alex.linderson@gmail.com"
              placeholderTextColor="#A6A6A6"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mt-6 items-center">
            <Text className="text-sm text-gray-700 font-opensans">
              Already have an account?{' '}
              <Text
                className="text-blue-600 font-opensans"
                onPress={() => router.push('/(login)/login-phone')}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            left: 28,
            right: 28,
            bottom: buttonBottom,
          }}
          className="items-center"
        >
          <TouchableOpacity
            className="bg-white rounded-2xl border border-[#E2E2E2] shadow-lg shadow-black/15 py-4 items-center w-full"
            activeOpacity={0.85}
          >
            <Text className="text-lg text-gray-900 font-montserrat">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
