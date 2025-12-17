import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Cappuccino');
  
  // Données des catégories
  const categories = [
    { id: '1', name: 'Cappuccino', icon: '☕' },
    { id: '2', name: 'Coffee', icon: '☕' },
    { id: '3', name: 'Expresso', icon: '☕' },
    { id: '4', name: 'Cold Brew', icon: '☕' },
  ];
  
  // Données des produits
  const products = [
    {
      id: '1',
      name: 'Cappuccino',
      description: 'With Sugar',
      price: '50.000',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'With Sugar',
      price: '50.000',
      image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Cappuccino',
      description: 'With Sugar',
      price: '50.000',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Coffee',
      description: 'With Sugar',
      price: '50.000',
      image: 'https://images.pexels.com/photos/6347/coffee-cup-working-happy.jpg',
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Cappuccino',
      description: 'With Sugar',
      price: '50.000',
      image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
      isFavorite: true,
    },
  ];

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.isFavorite && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.heartIcon}>❤️</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>Rp</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec localisation et notification */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <Text style={styles.markerIcon}>📍</Text>
          </View>
          <Text style={styles.locationText}>Jakarta, Indonesia</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Profil et salutation */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>Y</Text>
        </View>
        <Text style={styles.greeting}>Good morning, Yudi</Text>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coffee ..."
          placeholderTextColor="#80A896"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Catégories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Liste des produits */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productsRow}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, styles.specialOfferTitle]}>
            Special Offer
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Menu du bas */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuIcon, styles.menuItemActive]}>🏠</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❤️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🛒</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  markerIcon: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  notificationButton: {
    padding: 5,
  },
  bellIcon: {
    fontSize: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: '#E3E6E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 51,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchIconText: {
    fontSize: 16,
    color: '#80A896',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#80A896',
  },
  filterButton: {
    padding: 5,
  },
  filterIcon: {
    fontSize: 18,
    color: '#03532B',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 20,
  },
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
  categoryIcon: {
    fontSize: 12,
    marginRight: 6,
    color: '#00582F',
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
    color: '#00582F',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  specialOfferTitle: {
    marginTop: 25,
    marginBottom: 15,
  },
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
  },
  heartIcon: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  productInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    marginRight: 4,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
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
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  },
  menuIcon: {
    fontSize: 22,
    color: '#80A896',
  },
  menuItemActive: {
    color: '#00512C',
  },
});