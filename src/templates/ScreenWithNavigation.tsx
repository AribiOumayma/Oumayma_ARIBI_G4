// src/templates/ScreenWithNavigation.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';

interface Props {
  children: ReactNode;
  showBottomNavigation?: boolean;
  safeAreaEdges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export default function ScreenWithNavigation({
  children,
  showBottomNavigation = true,
  safeAreaEdges = ['top']
}: Props) {
  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      <View style={styles.content}>
        {children}
      </View>
      {showBottomNavigation && <BottomNavigation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  content: {
    flex: 1,
  },
});