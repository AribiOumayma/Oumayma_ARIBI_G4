// src/navigation/PublicNavigation.tsx
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const PublicStack = createNativeStackNavigator();

export default function PublicNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <PublicStack.Screen name="Home" component={HomeScreen} />
      ) : (
        <PublicStack.Screen name="Login">
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </PublicStack.Screen>
      )}
    </PublicStack.Navigator>
  );
}