// src/data/coffees.ts (VERSION UNIQUE)
export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isFavorite: boolean;
  category: string;
  about?: string;
}

// Liste initiale des cafés
export const coffees: Coffee[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'With Oat Milk',
    price: '50.000',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    isFavorite: false,
    category: 'Cappuccino',
    about: 'A classic Italian coffee drink prepared with espresso, hot milk, and steamed milk foam. Our version uses oat milk for a creamy, dairy-free alternative. Perfect for those who love a rich, creamy texture without dairy.',
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'With Sugar',
    price: '50.000',
    image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg',
    isFavorite: false,
    category: 'Cappuccino',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.....',
  },
  {
    id: '3',
    name: 'Latte',
    description: 'With Almond Milk',
    price: '55.000',
    image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
    isFavorite: true,
    category: 'Latte',
    about: 'A coffee drink made with espresso and steamed milk. Our version uses almond milk for a nutty, slightly sweet flavor. A perfect choice for those who prefer a milder coffee taste.',
  },
  {
    id: '4',
    name: 'Americano',
    description: 'Strong & Bold',
    price: '45.000',
    image: 'https://images.pexels.com/photos/6347/coffee-cup-working-happy.jpg',
    isFavorite: true,
    category: 'Coffee',
    about: 'Made by diluting an espresso with hot water, giving it a similar strength to, but different flavor from, traditionally brewed coffee. Perfect for those who enjoy a strong, bold coffee flavor.',
  },
  {
    id: '5',
    name: 'Cold Brew',
    description: 'Smooth & Refreshing',
    price: '60.000',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    isFavorite: false,
    category: 'Cold Brew',
    about: 'Cold brew coffee is made by steeping coarsely ground coffee beans in room-temperature water for an extended period. The result is a smooth, less acidic coffee concentrate that is refreshing and perfect for hot days.',
  },
];

// Fonctions pour gérer les favoris - UNE SEULE DÉCLARATION
export const FavoritesManager = {
  // Ajouter/retirer des favoris
  toggleFavorite: (coffeeId: string): Coffee[] => {
    const coffeeIndex = coffees.findIndex(c => c.id === coffeeId);
    if (coffeeIndex !== -1) {
      coffees[coffeeIndex].isFavorite = !coffees[coffeeIndex].isFavorite;
    }
    return FavoritesManager.getFavorites();
  },

  // Obtenir tous les favoris
  getFavorites: (): Coffee[] => {
    return coffees.filter(coffee => coffee.isFavorite);
  },

  // Vérifier si un café est favori
  isFavorite: (coffeeId: string): boolean => {
    const coffee = coffees.find(c => c.id === coffeeId);
    return coffee ? coffee.isFavorite : false;
  },

  // Obtenir tous les cafés
  getAllCoffees: (): Coffee[] => {
    return coffees;
  },

  // Mettre à jour un café
  updateCoffee: (updatedCoffee: Coffee) => {
    const index = coffees.findIndex(c => c.id === updatedCoffee.id);
    if (index !== -1) {
      coffees[index] = updatedCoffee;
    }
  }
};