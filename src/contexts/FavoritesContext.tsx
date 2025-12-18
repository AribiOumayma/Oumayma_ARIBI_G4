// src/contexts/FavoritesContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Coffee, FavoritesManager } from '../data/coffees';

interface FavoritesContextType {
  favorites: Coffee[];
  toggleFavorite: (coffeeId: string) => void;
  refreshFavorites: () => void;
  isFavorite: (coffeeId: string) => boolean;
  getAllCoffees: () => Coffee[];
  updateCoffee: (coffee: Coffee) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Coffee[]>(FavoritesManager.getFavorites());

  const toggleFavorite = (coffeeId: string) => {
    const updatedFavorites = FavoritesManager.toggleFavorite(coffeeId);
    setFavorites(updatedFavorites);
  };

  const refreshFavorites = () => {
    setFavorites(FavoritesManager.getFavorites());
  };

  const isFavorite = (coffeeId: string) => {
    return FavoritesManager.isFavorite(coffeeId);
  };

  const getAllCoffees = () => {
    return FavoritesManager.getAllCoffees();
  };

  const updateCoffee = (coffee: Coffee) => {
    FavoritesManager.updateCoffee(coffee);
    setFavorites(FavoritesManager.getFavorites());
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        refreshFavorites,
        isFavorite,
        getAllCoffees,
        updateCoffee,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};