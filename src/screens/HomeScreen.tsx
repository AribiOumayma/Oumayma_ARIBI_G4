// src/screens/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWithNavigation from '../templates/ScreenWithNavigation';
import CategoryItem from '../components/CategoryItem';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { getAllCoffees, refreshFavorites } = useFavorites();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coffees, setCoffees] = useState(getAllCoffees());

  useFocusEffect(
    React.useCallback(() => {
      refreshFavorites();
      setCoffees(getAllCoffees());
    }, [])
  );

  // Génère les catégories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(coffees.map(c => c.category)));
    return ['All', ...unique.sort()];
  }, [coffees]);

  // Filtre les produits
  const filteredCoffees = useMemo(() => {
    return coffees.filter(coffee => {
      const matchesCategory = selectedCategory === 'All' || coffee.category === selectedCategory;
      const matchesSearch =
        coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coffee.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, coffees]);

  return (
    <ScreenWithNavigation>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.markerIcon}>📍</Text>
          <Text style={styles.locationText}>Jakarta, Indonesia</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>Y</Text>
        </View>
        <Text style={styles.greeting}>Good morning, Yudi</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconText}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coffee ..."
          placeholderTextColor="#80A896"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem
              name={item}
              icon="☕"
              isActive={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
            />
          )}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Products */}
      <FlatList
        data={filteredCoffees}
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
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, styles.specialOfferTitle]}>
            {selectedCategory === 'All' ? 'All Coffees' : selectedCategory}
          </Text>
        }
        ListEmptyComponent={
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#888' }}>
              No coffee found 😔
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenWithNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  markerIcon: {
    fontSize: 16,
    marginRight: 8
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000'
  },
  bellIcon: {
    fontSize: 20
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: '#E3E6E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  profileInitial: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000'
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 51
  },
  searchIconText: {
    fontSize: 16,
    color: '#80A896',
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#000'
  },
  filterIcon: {
    fontSize: 18,
    color: '#03532B'
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 25
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15
  },
  specialOfferTitle: {
    marginTop: 25
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  productsRow: {
    justifyContent: 'space-between'
  },
});