//src/components/ AppButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

interface Props {
  title?: string;          // title devient optionnel
  onPress: () => void;
  children?: React.ReactNode;  // Permet d’ajouter des éléments personnalisés (comme les points)
}

export default function AppButton({ title, onPress, children }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {children ? (
        <View style={styles.content}>
          {children}
          {title && <Text style={styles.text}>{title}</Text>}
        </View>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A3D2A',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  // On garde ces styles pour les points (ils seront utilisés dans SplashScreen)
  dotsContainer: {
    flexDirection: 'row',
    marginRight: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 3,
  },
});