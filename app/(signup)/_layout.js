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
        name="signup-form"
        options={{
          title: 'Signup Form',
          tabBarButton: () => null,
        }}
      />
      {/* <Tabs.Screen
        name="signup-form"
        options={{
          title: 'Signup Form',
          tabBarButton: () => null,
        }}
      /> */}
      {/* <Tabs.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          tabBarButton: () => null,
        }}
      /> */}
    </Tabs>
  );
}
