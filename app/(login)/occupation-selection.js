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

export default function OccupationSelectionScreen() {
  const router = useRouter();
  const [occupations, setOccupations] = useState([
    { id: 'occ-1', value: 'Painter' },
    { id: 'occ-2', value: 'Teacher' },
  ]);
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

  const addOccupation = () => {
    if (occupations.length >= 3) return;
    setOccupations((prev) => [...prev, { id: `${Date.now()}`, value: '' }]);
  };

  const removeOccupation = (id) => {
    setOccupations((prev) => prev.filter((occ) => occ.id !== id));
  };

  const buttonBottom = keyboardHeight > 0 ? keyboardHeight + 16 : 40;
  const canAddMore = occupations.length < 3;

  return (
    <SafeAreaView className="flex-1 bg-[#C8E1EA]">
      <StatusBar style="dark" />

      <View className="flex-row items-center px-4 pt-4 pb-3">
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Text className="text-2xl text-black font-montserrat">{'<'}</Text>
        </Pressable>
        <Text className="flex-1 text-center text-xl text-[#0C3040] font-montserrat">
          Add Occupation
        </Text>
        <View className="w-6" />
      </View>

      <View className="px-4">
        <View className="h-[1px] bg-[#B6BDC5]" />
        <View className="h-[1px] bg-[#7B6BE6] w-1/2" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 180,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-sm text-[#7765c4] font-opensans mb-6">
          Up to 3 Occupations can be added
        </Text>

        <View className="space-y-3">
          {occupations.map((occ, idx) => {
            const isLast = idx === occupations.length - 1;
            const showAdd = isLast && canAddMore;
            const showRemove = !showAdd && occupations.length > 1;
            return (
              <View
                key={occ.id}
                className="flex-row items-center bg-white border border-[#B6BDC5] rounded-xl px-3 py-2.5"
                style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 }}
              >
                <Text className="text-xl mr-2">🧰</Text>
                <TextInput
                  className="flex-1 text-base text-[#0C3040] font-opensans"
                  placeholder="Type main occupation"
                  placeholderTextColor="#9BA4AE"
                  value={occ.value}
                  onChangeText={(text) =>
                    setOccupations((prev) =>
                      prev.map((item) =>
                        item.id === occ.id ? { ...item, value: text } : item
                      )
                    )
                  }
                  returnKeyType="done"
                />
                <Pressable hitSlop={12} onPress={() => {}}>
                  <Text className="text-xl">🎤</Text>
                </Pressable>
                {showRemove ? (
                  <Pressable
                    hitSlop={10}
                    className="ml-3 h-9 w-9 rounded-full bg-[#C04B4B] items-center justify-center"
                    onPress={() => removeOccupation(occ.id)}
                  >
                    <Text className="text-2xl text-white leading-5">−</Text>
                  </Pressable>
                ) : null}
                {showAdd ? (
                  <Pressable
                    hitSlop={10}
                    className="ml-3 h-9 w-9 rounded-full bg-[#A34C2F] items-center justify-center"
                    onPress={addOccupation}
                  >
                    <Text className="text-2xl text-white leading-5">+</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}
        </View>

       

        <View className="mt-10">
          <View className="flex-row items-center bg-white rounded-2xl px-3 py-3 shadow-sm">
            <View className="h-12 w-12 rounded-full bg-[#E6EFF4] items-center justify-center mr-3">
              <Text className="text-lg text-[#0C3040] font-montserrat">A</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base text-[#0C3040] font-montserrat">
                Alex Linderson
              </Text>
              <Text className="text-sm text-[#0C3040] font-opensans">
                Software Engineer at Rootkit Consultancy
              </Text>
              <Text className="text-xs text-[#7C8795] font-opensans">
                Food Engineer · Technical Writer
              </Text>
              <Text className="text-xs text-[#4A8BD3] font-opensans mt-1">
                Have a good day.
              </Text>
            </View>
          </View>
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
          onPress={() => {
            router.push('/(chat)');
          }}
        >
          <Text className="text-lg text-gray-900 font-montserrat">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
