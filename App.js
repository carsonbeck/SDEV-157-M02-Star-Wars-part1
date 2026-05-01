import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';

import PlanetsScreen from './screens/PlanetsScreen';
import FilmsScreen from './screens/FilmsScreen';
import SpaceshipsScreen from './screens/SpaceshipsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#FFE81F',
        tabBarInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#FFE81F',
      }}
    >
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#000' },
        drawerActiveTintColor: '#FFE81F',
        drawerInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#FFE81F',
      }}
    >
      <Drawer.Screen name="Planets" component={PlanetsScreen} />
      <Drawer.Screen name="Films" component={FilmsScreen} />
      <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />}
      </NavigationContainer>

      {!isConnected && (
        <View style={styles.offlineOverlay}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
          <Text style={styles.offlineSubText}>
            Please check your network settings and try again.
          </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  offlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFE81F',
    marginBottom: 12,
  },
  offlineSubText: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});