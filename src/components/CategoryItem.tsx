// src/components/CategoryItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface Props {
  name: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryItem({ name, icon, isActive, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isActive && styles.categoryItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icône directement rendue */}
      {icon}
      <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryItemActive: {
    backgroundColor: '#00582F',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#00582F',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
});