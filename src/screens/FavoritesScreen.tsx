// src/screens/FavoritesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWithNavigation from '../templates/ScreenWithNavigation';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { useFavorites } from '../contexts/FavoritesContext';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const { favorites, refreshFavorites, getAllCoffees } = useFavorites();

  useFocusEffect(
    React.useCallback(() => {
      refreshFavorites();
    }, [])
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>❤️</Text>
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptyText}>
        Tap the heart icon on any coffee{'\n'}to add it to your favorites
      </Text>
    </View>
  );

  return (
    <ScreenWithNavigation>
      {/* Header avec BackButton */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Favorites Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            isFavorite={item.isFavorite}
            showFavoriteButton={true}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productsRow}
        contentContainerStyle={[
          styles.productsContainer,
          favorites.length === 0 && styles.emptyListContainer,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWithNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
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
  headerRight: {
    width: 40, // Pour équilibrer avec le BackButton
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 60,
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
});