// src/components/AppButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

interface Props {
  title?: string;
  onPress: () => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function AppButton({
  title,
  onPress,
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left'
}: Props) {

  // Styles dynamiques selon la variante
  const getVariantStyle = () => {
    switch(variant) {
      case 'secondary': return styles.buttonSecondary;
      case 'outline': return styles.buttonOutline;
      default: return styles.buttonPrimary;
    }
  };

  // Styles dynamiques selon la taille
  const getSizeStyle = () => {
    switch(size) {
      case 'small': return styles.buttonSmall;
      case 'large': return styles.buttonLarge;
      default: return styles.buttonMedium;
    }
  };

  // Texte dynamique selon la variante
  const getTextStyle = () => {
    switch(variant) {
      case 'outline': return styles.textOutline;
      default: return styles.textPrimary;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#0A3D2A' : '#FFFFFF'} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && icon}
          {children ? (
            <>
              {children}
              {title && <Text style={[styles.text, getTextStyle()]}>{title}</Text>}
            </>
          ) : (
            <>
              {icon && iconPosition === 'left' && <View style={styles.iconSpacer} />}
              {title && <Text style={[styles.text, getTextStyle()]}>{title}</Text>}
              {icon && iconPosition === 'right' && <View style={styles.iconSpacer} />}
              {icon && iconPosition === 'right' && icon}
            </>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonPrimary: {
    backgroundColor: '#0A3D2A',
  },
  buttonSecondary: {
    backgroundColor: '#C1925B',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0A3D2A',
  },
  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonMedium: {
    paddingVertical: 18,
    paddingHorizontal: 48,
  },
  buttonLarge: {
    paddingVertical: 22,
    paddingHorizontal: 60,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#0A3D2A',
  },
  iconSpacer: {
    width: 8,
  },
});