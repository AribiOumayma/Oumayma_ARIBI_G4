// src/templates/AppScreen.tsx - VERSION AMÉLIORÉE
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

interface Props {
  children: ReactNode;
  showNav?: boolean;
}

export default function AppScreen({ children, showNav = true }: Props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
      {showNav && <BottomNavigation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    position: 'relative',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Espace pour la navigation du bas
  },
});