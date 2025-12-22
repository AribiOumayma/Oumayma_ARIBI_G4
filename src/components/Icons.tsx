// src/components/Icons.tsx - COPIER-COLLER CE CODE EXACT
import React from 'react';
import { Text } from 'react-native';

export const CoffeeIcon = ({ isActive = false }: { isActive?: boolean }) => (
  <Text style={{
    fontSize: 12,
    color: isActive ? '#FFFFFF' : '#00582F',
    marginRight: 6
  }}>
    ☕
  </Text>
);

export const HomeIcon = () => <Text style={{ fontSize: 22 }}>🏠</Text>;
export const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <Text style={{ fontSize: 22 }}>{filled ? '❤️' : '🤍'}</Text>
);
export const CartIcon = () => <Text style={{ fontSize: 22 }}>🛒</Text>;
export const PersonIcon = () => <Text style={{ fontSize: 22 }}>👤</Text>;
export const BellIcon = () => <Text style={{ fontSize: 20 }}>🔔</Text>;
export const SearchIcon = () => <Text style={{ fontSize: 16 }}>🔍</Text>;
export const FilterIcon = () => <Text style={{ fontSize: 18 }}>☰</Text>;
export const LocationIcon = () => <Text style={{ fontSize: 16 }}>📍</Text>;
export const BackIcon = () => <Text style={{ fontSize: 24 }}>←</Text>;
export const StarIcon = () => <Text style={{ fontSize: 14 }}>★</Text>;
export const TrashIcon = () => <Text style={{ fontSize: 20 }}>🗑️</Text>;
export const CheckmarkIcon = () => <Text style={{ fontSize: 20 }}>✓</Text>;