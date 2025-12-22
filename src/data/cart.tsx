// src/data/cart.ts
import { Coffee } from './coffees';

export interface CartItem extends Coffee {
  quantity: number;
  selectedSize?: string;
  selectedSugar?: string;
  uniqueId?: string; // Nouveau: pour différencier les variantes
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Panier initial
let cartItems: CartItem[] = [];

// Fonction pour créer un ID unique qui inclut les options
const createUniqueId = (coffee: any): string => {
  const size = coffee.selectedSize || 'Medium';
  const sugar = coffee.selectedSugar || 'No Sugar';
  return `${coffee.id}-${size}-${sugar}`;
};

// Fonctions pour gérer le panier
export const CartManager = {
  // Ajouter un produit au panier AVEC OPTIONS
  addToCart: (coffee: any): CartItem[] => {
    const uniqueId = createUniqueId(coffee);
    const existingItem = cartItems.find(item => item.uniqueId === uniqueId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...coffee,
        quantity: 1,
        uniqueId: uniqueId,
        selectedSize: coffee.selectedSize || 'Medium',
        selectedSugar: coffee.selectedSugar || 'No Sugar',
      });
    }

    return cartItems;
  },

  // Retirer un produit du panier (utilise l'ID unique)
  removeFromCart: (uniqueId: string): CartItem[] => {
    cartItems = cartItems.filter(item => item.uniqueId !== uniqueId);
    return cartItems;
  },

  // Mettre à jour la quantité (utilise l'ID unique)
  updateQuantity: (uniqueId: string, quantity: number): CartItem[] => {
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    if (item) {
      if (quantity <= 0) {
        return CartManager.removeFromCart(uniqueId);
      }
      item.quantity = quantity;
    }
    return cartItems;
  },

  // Augmenter la quantité de 1 (utilise l'ID unique)
  increaseQuantity: (uniqueId: string): CartItem[] => {
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    if (item) {
      item.quantity += 1;
    }
    return cartItems;
  },

  // Diminuer la quantité de 1 (utilise l'ID unique)
  decreaseQuantity: (uniqueId: string): CartItem[] => {
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      return cartItems;
    } else if (item) {
      return CartManager.removeFromCart(uniqueId);
    }
    return cartItems;
  },

  // Obtenir tous les items du panier
  getCartItems: (): CartItem[] => {
    return cartItems;
  },

  // Obtenir le nombre total d'articles
  getTotalItems: (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Obtenir le prix total
  getTotalPrice: (): number => {
    return cartItems.reduce((total, item) => {
      // Convertir le prix string en nombre
      const priceStr = item.price.replace(/\./g, '');
      const price = parseFloat(priceStr);
      return total + (price * item.quantity);
    }, 0);
  },

  // Vider le panier
  clearCart: (): CartItem[] => {
    cartItems = [];
    return cartItems;
  },

  // Vérifier si un produit est dans le panier (par ID de base)
  isInCart: (coffeeId: string): boolean => {
    return cartItems.some(item => item.id === coffeeId);
  },

  // Obtenir la quantité d'un produit (toutes variantes confondues)
  getQuantity: (coffeeId: string): number => {
    return cartItems
      .filter(item => item.id === coffeeId)
      .reduce((total, item) => total + item.quantity, 0);
  },

  // Vérifier si une variante spécifique est dans le panier
  isVariantInCart: (coffee: any): boolean => {
    const uniqueId = createUniqueId(coffee);
    return cartItems.some(item => item.uniqueId === uniqueId);
  },

  // Obtenir la quantité d'une variante spécifique
  getVariantQuantity: (coffee: any): number => {
    const uniqueId = createUniqueId(coffee);
    const item = cartItems.find(item => item.uniqueId === uniqueId);
    return item ? item.quantity : 0;
  },

  // Obtenir un item par son ID unique
  getItemByUniqueId: (uniqueId: string): CartItem | undefined => {
    return cartItems.find(item => item.uniqueId === uniqueId);
  },
};