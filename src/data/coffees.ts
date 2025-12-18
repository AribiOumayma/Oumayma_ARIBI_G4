// src/data/coffees.ts
export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isFavorite: boolean;
  category: string;
}

// Liste initiale des cafés
export let coffees: Coffee[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'With Oat Milk',
    price: '50.000',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    isFavorite: false,
    category: 'Cappuccino',
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'With Sugar',
    price: '50.000',
    image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg',
    isFavorite: false,
    category: 'Cappuccino',
  },
  {
    id: '3',
    name: 'Latte',
    description: 'With Almond Milk',
    price: '55.000',
    image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
    isFavorite: true,
    category: 'Latte',
  },
  {
    id: '4',
    name: 'Americano',
    description: 'Strong & Bold',
    price: '45.000',
    image: 'https://images.pexels.com/photos/6347/coffee-cup-working-happy.jpg',
    isFavorite: true,
    category: 'Coffee',
  },
  {
    id: '5',
    name: 'Cold Brew',
    description: 'Smooth & Refreshing',
    price: '60.000',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    isFavorite: false,
    category: 'Cold Brew',
  },
];

// Fonctions pour gérer les favoris
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