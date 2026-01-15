import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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

export default function LoginOtpVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

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

  const handleChange = (text, index) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < next.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const code = otp.join('');
    // TODO: submit code
    router.push('/(login)/occupation-selection');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EFEFEF]">
      <StatusBar style="dark" />

      <View className="pb-4 pt-4 px-4 flex-row items-center">
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Text className="text-2xl text-black font-montserrat">{'<'}</Text>
        </Pressable>
        <Text className="flex-1 text-center text-lg text-black font-montserrat">
          Phone Verification
        </Text>
        <View className="w-6" />
      </View>

      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 48,
            paddingBottom: 200,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            <Text className="text-center text-[20px] leading-7 text-black font-montserrat-bold">
              Enter 6 digit verification code{'\n'}sent to your phone number
            </Text>

            <View className="mt-10 flex-row justify-between px-2">
              {otp.map((value, idx) => (
                <TextInput
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  className="w-12 h-12 bg-[#F5F5F5] border border-[#2B2B2B] rounded-md text-center text-lg text-gray-900 font-montserrat"
                  value={value}
                  maxLength={1}
                  keyboardType="number-pad"
                  onChangeText={(text) => handleChange(text, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  returnKeyType="next"
                />
              ))}
            </View>

            <Pressable className="mt-6" onPress={() => {}}>
              <Text className="text-center text-sm text-[#E67835] font-opensans">
                Resend Code
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: buttonBottom,
          }}
          className="items-center"
        >
          <TouchableOpacity
            className="bg-white rounded-2xl border border-[#E2E2E2] shadow-lg shadow-black/15 py-4 items-center w-full"
            activeOpacity={0.85}
            onPress={handleContinue}
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
