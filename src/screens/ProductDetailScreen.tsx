// src/screens/ProductDetailScreen.tsx (VERSION CORRIGÉE COMPLÈTE)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';
import { useCart } from '../contexts/CartContext';
import { BackIcon, HeartIcon, StarIcon } from '../components/Icons';

const { width, height } = Dimensions.get('window');

type CupSize = 'Small' | 'Medium' | 'Large';
type SugarLevel = 'No Sugar' | 'Low' | 'Medium';

export default function ProductDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addToCart } = useCart();

  const routeProduct = route.params?.product;

  const defaultProduct = {
    id: '2',
    name: 'Cappuccino',
    description: 'With Sugar',
    price: '50.000',
    image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg',
    rating: 4.8,
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.....',
  };

  const product = routeProduct || defaultProduct;

  const [selectedSize, setSelectedSize] = useState<CupSize>('Small');
  const [selectedSugar, setSelectedSugar] = useState<SugarLevel>('No Sugar');
  const [isFavorite, setIsFavorite] = useState(false);

  const cupSizes: CupSize[] = ['Small', 'Medium', 'Large'];
  const sugarLevels: SugarLevel[] = ['No Sugar', 'Low', 'Medium'];

  const handleAddToCart = () => {
    const productWithOptions = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      selectedSize,
      selectedSugar,
      quantity: 1,
    };

    addToCart(productWithOptions);
    alert(`${product.name} (${selectedSize}, ${selectedSugar}) added to cart!`);
    navigation.goBack();
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* White card overlay */}
      <View style={styles.whiteCard} />

      {/* Header with back and favorite buttons */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.backButtonCircle}>
              <BackIcon size={26} color="#00582F" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <View style={styles.favoriteButtonCircle}>
              <HeartIcon size={22} filled={isFavorite} color={isFavorite ? '#FF0000' : '#00582F'} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Product name and description positioned on the image */}
      <View style={styles.productInfoOnImage}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Rating badge positioned on the image */}
        <View style={styles.ratingBadge}>
          <StarIcon color="#FFFFFF" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.contentScrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cup Size Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cup Size</Text>
          <View style={styles.optionsRow}>
            {cupSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  selectedSize === size && styles.optionButtonActive
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.optionText,
                  selectedSize === size && styles.optionTextActive
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sugar Level Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Level Sugar</Text>
          <View style={styles.optionsRow}>
            {sugarLevels.map((sugar) => (
              <TouchableOpacity
                key={sugar}
                style={[
                  styles.optionButton,
                  selectedSugar === sugar && styles.optionButtonActive
                ]}
                onPress={() => setSelectedSugar(sugar)}
              >
                <Text style={[
                  styles.optionText,
                  selectedSugar === sugar && styles.optionTextActive,
                  sugar === 'No Sugar' && styles.noSugarText
                ]}>
                  {sugar}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {product.about || product.fullDescription || 'No description available.'}
          </Text>
        </View>

        {/* Spacer for the fixed button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Bottom Add to Cart Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <View style={styles.buttonContent}>
            <Text style={styles.addToCartText}>Add to cart</Text>
            <View style={styles.separatorLine} />
            <Text style={styles.priceText}>Rp {product.price}</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: width + 2,
    height: 619,
    left: -1,
    top: -119,
  },
  whiteCard: {
    position: 'absolute',
    width: width,
    height: 444,
    left: 0,
    top: 379,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -50 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButtonCircle: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 30,
    top: 21,
  },
  favoriteButtonCircle: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 348,
    top: 21,
  },
  productInfoOnImage: {
    position: 'absolute',
    left: 30,
    top: 305,
    zIndex: 5,
  },
  productName: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 44,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  productDescription: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingBadge: {
    position: 'absolute',
    width: 77,
    height: 32,
    left: 279,
    top: 22,
    backgroundColor: '#C1925B',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  ratingText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  contentScrollView: {
    position: 'absolute',
    top: 379,
    width: width,
    height: 444,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  section: {
    paddingHorizontal: 34,
    marginTop: 34,
  },
  sectionTitle: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: 103,
    height: 32,
    borderRadius: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#00512C',
    borderColor: '#00512C',
  },
  optionText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  noSugarText: {
    fontSize: 14,
  },
  aboutText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
    marginTop: 10,
  },
  bottomSpacer: {
    height: 120,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  addToCartButton: {
    width: 352,
    height: 76,
    backgroundColor: '#00512C',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  addToCartText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  priceText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  separatorLine: {
    width: 2,
    height: 32,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '90deg' }],
  },
});