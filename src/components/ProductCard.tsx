// src/components/ProductCard.tsx - FIXED VERSION
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

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
  coffee: any;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  isFavorite: initialIsFavorite,
  onAddPress,
  showFavoriteButton = true,
  coffee
}: Props) {
  const navigation = useNavigation<any>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, getQuantity, isInCart } = useCart();

  const favorite = isFavorite(id);
  const inCart = isInCart(id);
  const quantity = getQuantity(id);

  // FIXED: Proper function declaration
  const handleFavoritePress = () => {
    toggleFavorite(id);
  };

  const handleAddToCart = () => {
    addToCart(coffee);
  };

  const handleProductPress = () => {
    navigation.navigate('ProductDetail', {
      product: coffee
    });
  };

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={handleProductPress}
      activeOpacity={0.9}
    >
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

      <TouchableOpacity
        style={[styles.addButton, inCart && styles.addButtonActive]}
        onPress={handleAddToCart}
      >
        {inCart ? (
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Text style={styles.plusMinusText}>+</Text>
          </View>
        ) : (
          <Text style={styles.addButtonText}>+</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
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
  addButtonActive: {
    backgroundColor: '#0A3D2A',
    width: 50,
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 4,
  },
  plusMinusText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});