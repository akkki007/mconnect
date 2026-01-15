import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const renderIcon = (name) => ({ focused }) => (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <IconSymbol size={28} name={name} color={focused ? '#fff' : '#1f1f1f'} />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#1f1f1f',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: { paddingVertical: 6 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: 2 },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: renderIcon('chat.fill'),
        }}
      />
      <Tabs.Screen
        name="occupation"
        options={{
          title: 'Occupation',
          tabBarIcon: renderIcon('bag.fill'),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: renderIcon('sync.circle.fill'),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: renderIcon('phone.fill'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: renderIcon('person.fill'),
        }}
      />
      {/* Hide non-tab routes so they don't appear in the bottom bar */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen
        name="occupation-add"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="occupation-search"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 78,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopColor: '#e3e3e3',
    borderTopWidth: 1,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#c67852',
  },
});
