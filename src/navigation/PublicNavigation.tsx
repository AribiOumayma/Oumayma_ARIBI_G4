
// PublicNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const PublicStack = createNativeStackNavigator();

export default function PublicNavigation() {
  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="Home" component={HomeScreen} />
    </PublicStack.Navigator>
  );
}