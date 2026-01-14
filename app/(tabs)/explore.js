import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#98C1D9]">
      <StatusBar style="dark" />

      <View className="flex-1 items-center px-6 pt-6">
        <Image
          source={require('../../assets/images/Two men shaking hands making business deal.png')}
          className="w-200 h-200"
          resizeMode="contain"
        />
        <Text className="text-black text-3xl font-montserrat text-center mt-6">
          Connect & Collaborate{'\n'}With Professionals
        </Text>
      </View>
      
      <View className="flex-row justify-center gap-4 pb-12 px-6">
        <Pressable
          className="bg-white px-7 py-3 rounded-2xl shadow-lg shadow-black/20"
          android_ripple={{ color: '#e5e7eb', borderless: false }}
          onPress={() => router.push('/(tabs)/login')}
        >
          <Text className="text-black text-lg font-montserrat">Log In</Text>
        </Pressable>
        <Pressable
          className="bg-[#1D68D9] px-7 py-3 rounded-2xl shadow-lg shadow-black/25"
          android_ripple={{ color: '#1d4ed8', borderless: false }}
          onPress={() => router.push('/(tabs)/signup')}
        >
          <Text className="text-white text-lg font-montserrat">Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
