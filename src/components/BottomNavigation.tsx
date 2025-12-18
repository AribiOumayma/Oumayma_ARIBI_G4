// src/components/BottomNavigation.tsx - VÉRIFIÉ
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { Session } from '../utils/session';

export default function BottomNavigation() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { totalItems } = useCart();

  const isActive = (screenName: string) => {
    return route.name === screenName;
  };

  const handleLogout = () => {
    Session.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.menuItem}
      >
        <Text style={[styles.menuIcon, isActive('Home') && styles.menuItemActive]}>
          🏠
        </Text>
        <Text style={[styles.menuText, isActive('Home') && styles.menuTextActive]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Favorites')}
        style={styles.menuItem}
      >
        <Text style={[styles.menuIcon, isActive('Favorites') && styles.menuItemActive]}>
          ❤️
        </Text>
        <Text style={[styles.menuText, isActive('Favorites') && styles.menuTextActive]}>
          Favorites
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.menuItem}
      >
        <View style={styles.cartContainer}>
          <Text style={[styles.menuIcon, isActive('Cart') && styles.menuItemActive]}>
            🛒
          </Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalItems > 9 ? '9+' : totalItems}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.menuText, isActive('Cart') && styles.menuTextActive]}>
          Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.menuItem}
      >
        <Text style={styles.menuIcon}>👤</Text>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  menuIcon: {
    fontSize: 22,
    color: '#80A896',
    marginBottom: 4,
  },
  menuText: {
    fontSize: 11,
    color: '#80A896',
    fontWeight: '500',
  },
  menuItemActive: {
    color: '#00512C',
  },
  menuTextActive: {
    color: '#00512C',
    fontWeight: '600',
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4848',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});