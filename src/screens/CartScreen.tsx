// src/screens/CartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppScreen from '../templates/AppScreen';
import BackButton from '../components/BackButton';
import { useCart } from '../contexts/CartContext';
import { TrashIcon } from '../components/Icons';

const { width, height } = Dimensions.get('window');

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />

        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>

          {/* AFFICHER LES OPTIONS */}
          {item.selectedSize && (
            <Text style={styles.itemOption}>Size: {item.selectedSize}</Text>
          )}
          {item.selectedSugar && (
            <Text style={styles.itemOption}>Sugar: {item.selectedSugar}</Text>
          )}

          <Text style={styles.itemPrice}>Rp {item.price}</Text>
        </View>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.uniqueId)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.uniqueId)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

         <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.uniqueId)}
              >
                <TrashIcon size={20} />
              </TouchableOpacity>
            </View>
          );
        };

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Add some delicious coffee to your cart
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.browseButtonText}>Browse Coffees</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppScreen showNav={true}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Liste des articles avec espace pour le checkout */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.uniqueId}
        contentContainerStyle={[
          styles.cartContainer,
          { paddingBottom: cartItems.length > 0 ? 180 : 40 }
        ]}
        ListEmptyComponent={renderEmptyCart}
        showsVerticalScrollIndicator={false}
        style={styles.cartList}
      />

      {/* Checkout Section - Fixée en bas */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Price</Text>
              <Text style={styles.summaryPrice}>{formatPrice(totalPrice)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                alert('Checkout feature coming soon!');
              }}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  clearText: {
    fontSize: 14,
    color: '#FF4848',
    fontWeight: '500',
  },
  cartList: {
    flex: 1,
  },
  cartContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemOption: {
    fontSize: 11,
    color: '#00512C',
    fontWeight: '500',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00512C',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#00512C',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#00512C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 80, // Au-dessus de la BottomNavigation
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  checkoutContent: {
    paddingHorizontal: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  summaryPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00512C',
  },
  checkoutButton: {
    backgroundColor: '#00512C',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});