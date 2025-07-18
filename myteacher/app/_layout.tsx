import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform } from 'react-native';
import { Search, MessageCircle, Calendar, User, Settings } from 'lucide-react-native';
import { useAuth } from '@/components/AuthProvider'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function TabLayout() {
  useFrameworkReady();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'sub_admin';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: isAdmin ? 100 : 88,
          },
          default: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: isAdmin ? 75 : 65,
          },
        }),
        tabBarBackground: Platform.OS === 'ios' ? () => (
          <BlurView
            intensity={100}
            style={StyleSheet.absoluteFillObject}
            tint="light"
          />
        ) : undefined,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 20 : 5,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 10 : 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Réservations',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Administration',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}