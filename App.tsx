// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { CartProvider } from './src/contexts/CartContext';
import AppNavigation from './src/navigation/AppNavigation';
import Bootsplash from "react-native-bootsplash";

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Bootsplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#FBFBFB"
      />
      <CartProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </FavoritesProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}