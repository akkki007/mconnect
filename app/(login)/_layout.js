import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen
        name="login-phone"
        options={{
          title: 'Phone Login',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="login-otp-verification"
        options={{
          title: 'OTP Verification',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="occupation-selection"
        options={{
          title: 'Occupation Selection',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
