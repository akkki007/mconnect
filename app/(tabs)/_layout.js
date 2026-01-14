import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="welcome" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="signup" />
      <Tabs.Screen name="updates" />
      <Tabs.Screen name="create-post" />
    </Tabs>
  );
}
