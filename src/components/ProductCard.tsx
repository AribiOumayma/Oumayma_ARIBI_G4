// src/components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

const { width } = Dimensions.get('window');

interface Props {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isFavorite: boolean;
  onAddPress?: () => void;
  showFavoriteButton?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  isFavorite: initialIsFavorite,
  onAddPress,
  showFavoriteButton = true
}: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleFavoritePress = () => {
    toggleFavorite(id);
  };

  return (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />
        {showFavoriteButton && (
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <Text style={[styles.heartIcon, favorite && styles.heartIconActive]}>
              {favorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        )}
        {favorite && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteBadgeText}>❤️</Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productDescription}>{description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currency}>Rp</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>

      {onAddPress && (
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    position: 'relative',
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 105,
    borderRadius: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4848',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  favoriteBadgeText: {
    fontSize: 12,
  },
  heartIcon: {
    fontSize: 20,
  },
  heartIconActive: {
    color: '#FF4848',
  },
  productInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginRight: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#00512C',
    width: 33,
    height: 33,
    borderRadius: 16.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});