// src/components/BottomNavigation.tsx - AVEC ICÔNES PROFESSIONNELLES
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { Session } from '../utils/session';
import { HomeIcon, HeartIcon, CartIcon, PersonIcon } from './Icons'; // Icônes importées

export default function BottomNavigation() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { totalItems } = useCart();
//Sert à colorer l’icône active
  const isActive = (screenName: string) => {
    return route.name === screenName;
  };
//Déconnexion + redirection
  const handleLogout = () => {
    Session.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuItems = [
    { name: 'Home', screen: 'Home', icon: HomeIcon },
    { name: 'Favorites', screen: 'Favorites', icon: HeartIcon },
    { name: 'Cart', screen: 'Cart', icon: CartIcon },
    { name: 'Logout', screen: 'Login', icon: PersonIcon, action: handleLogout },
  ];

  return (
    <View style={styles.bottomMenu}>
      {menuItems.map((item, index) => {
        const active = isActive(item.screen);
        const IconComponent = item.icon;

        return (
          <TouchableOpacity
            key={index}
            onPress={item.action || (() => navigation.navigate(item.screen))}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            {item.name === 'Cart' ? (
              <View style={styles.cartContainer}>
                <IconComponent size={22} isActive={active} />
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {totalItems > 9 ? '9+' : totalItems}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <IconComponent size={22} isActive={active} />
            )}
            <Text style={[styles.menuText, active && styles.menuTextActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Les styles restent identiques...
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
  menuText: {
    fontSize: 11,
    color: '#80A896',
    fontWeight: '500',
    marginTop: 4,
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