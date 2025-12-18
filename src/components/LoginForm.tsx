// src/components/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';
import { Session } from '../utils/session';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  // Utilisateur de test
  const testUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    if (Session.isLoggedIn()) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, []);

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (email === testUser.email && password === testUser.password) {
      // Sauvegarder la session
      Session.login(email);

      Alert.alert('Success', 'Login successful!');

      // Rediriger vers Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. Use:\nEmail: test@example.com\nPassword: password123');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        defaultValue="test@example.com"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        defaultValue="password123"
      />

      <AppButton title="Login" onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
});