// src/navigation/PublicNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

const PublicStack = createNativeStackNavigator();

export default function PublicNavigation() {
  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Splash" component={SplashScreen} />
      <PublicStack.Screen name="Login" component={LoginScreen} />
    </PublicStack.Navigator>
  );
}