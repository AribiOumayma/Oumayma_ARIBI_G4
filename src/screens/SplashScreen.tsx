// src/screens/SplashScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import { Session } from '../utils/session';

type Props = NativeStackScreenProps<any>;

export default function SplashScreen({ navigation }: Props) {
  const handleGetStarted = () => {
    if (Session.isLoggedIn()) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../../coffe.jpg')}
      resizeMode="repeat"
      style={styles.container}
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Image
          source={require('../../splash.png')}
          style={styles.centralImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Coffee so good,{'\n'}your taste buds{'\n'}will love it
        </Text>

        <Text style={styles.subtitle}>
          The best grain, the finest roast, the{'\n'}most powerful flavor.
        </Text>

        <AppButton title="Get started" onPress={handleGetStarted}>
          <View style={styles.buttonDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </AppButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8D0A9',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  centralImage: {
    width: '90%',
    height: 320,
    maxWidth: 380,
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#F0F0F0',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 60,
    opacity: 0.95,
  },
  buttonDots: {
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