import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Coord {
  lon: number;
  lat: number;
  city?: string;
}

interface FavoritesContextType {
  favorites: Coord[];
  addFavorite: (coord: Coord) => void;
  removeFavorite: (coord: Coord) => void;
}

interface childrenProps {
  children: React.ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: childrenProps) => {
  const [favorites, setFavorites] = useState<Coord[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  const addFavorite = (coord: Coord) => {
    const isExist = favorites.some(fav => fav.lat === coord.lat && fav.lon === coord.lon)
    if (!isExist) {
      setFavorites(prev => [...prev, coord]);
    };
  };

  const removeFavorite = (coord: Coord) => {
    setFavorites(favorites.filter(fav => fav.lat !== coord.lat || fav.lon !== coord.lon));
  };

  return (
    <FavoritesContext value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within Provider")
  }
  return context;
}
