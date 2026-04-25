import React, { createContext, useContext, useState, useEffect } from 'react'

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

interface childrenProps {
  children: React.ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: childrenProps) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  }

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter(c => c !== city));
  }

  return (
    <FavoritesContext value={{ favorites, addFavorite, removeFavorite }}> // .providerは不要
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
