// src/navigation/AppNavigation.tsx
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import Bootsplash from "react-native-bootsplash";
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  useEffect(() => {
    Bootsplash.hide({ fade: true });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'none', // ← DÉSACTIVE LES ANIMATIONS
        animationDuration: 0, // ← DURÉE ZÉRO
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          animation: 'slide_from_right', // Garde l'animation pour ProductDetail
          animationDuration: 200,
        }}
      />
    </Stack.Navigator>
  );
}