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

export default function LoginPhoneScreen() {
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

  const buttonBottom = keyboardHeight > 0 ? keyboardHeight + 16 : 56;

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar style="dark" />

      <View className="flex-1">
        <View className="pb-4 pt-4 relative items-center">
          <Pressable
            className="absolute left-5 top-3 h-10 w-10 items-center justify-center"
            hitSlop={12}
            onPress={() => router.back()}
          >
            <Text className="text-2xl text-black font-montserrat">X</Text>
          </Pressable>
          <Text className="text-lg text-black font-montserrat">Log In</Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 28,
            paddingTop: 40,
            paddingBottom: 220,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-between">
            <View>
              <Text className="text-center text-[22px] leading-7 text-black font-montserrat-bold">
                Enter the phone number for{'\n'}creating an account.
              </Text>
              <Text className="mt-4 text-center text-[3vw] text-[#333] font-opensans">
                A 6-digit OTP will be sent via SMS to verify your{'\n'}mobile
                number.
              </Text>

              <View className="mt-10 flex-row items-center">
                <Pressable className="flex-row items-center border border-[#2B2B2B] rounded-xl px-3 py-3 mr-3">
                  <Text className="text-[4vw] text-gray-900 font-montserrat">
                    +91
                  </Text>
                  <Text className="text-[4vw] text-gray-600 font-opensans ml-2">
                    ▾
                  </Text>
                </Pressable>
                <TextInput
                  className="flex-1 bg-[#F3F3F3] border border-[#2B2B2B] rounded-xl px-4 py-3 text-[4vw] text-gray-900 font-montserrat"
                  placeholder="9876543210"
                  placeholderTextColor="#B7B7B7"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View className="items-center mt-10">
              <Text className="text-sm text-gray-700 font-opensans">
                {"Don't received OTP? "}
                <Text className="text-blue-600 font-opensans">Resend OTP</Text>
              </Text>
            </View>
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
            onPress={() => router.push('/(login)/login-otp-verification')}
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
