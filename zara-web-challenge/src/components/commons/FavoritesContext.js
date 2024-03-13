import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoritesCounter, setFavoritesCounter] = useState(0);

  const updateFavoritesCounter = (count) => {
    setFavoritesCounter(count);
  };

  const clearFavoritesCounter = () => {
    setFavoritesCounter(0);
  };

  const favoritesContextValue = {
    favoritesCounter,
    updateFavoritesCounter,
    clearFavoritesCounter,
  };

  return (
    <FavoritesContext.Provider value={favoritesContextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
