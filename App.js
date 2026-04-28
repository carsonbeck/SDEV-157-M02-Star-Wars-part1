import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PlanetsScreen from './screens/PlanetsScreen';
import FilmsScreen from './screens/FilmsScreen';
import SpaceshipsScreen from './screens/SpaceshipsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#000'},
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}