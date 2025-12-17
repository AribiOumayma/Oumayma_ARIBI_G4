import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Bootsplash from "react-native-bootsplash";

const PublicStack = createNativeStackNavigator();

export default function PublicNavigation() {

  useEffect(() => {
      Bootsplash.hide({ fade: true });
    }, []);

  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="Home" component={HomeScreen} />
    </PublicStack.Navigator>
  );
}
export default AppNavigation;
