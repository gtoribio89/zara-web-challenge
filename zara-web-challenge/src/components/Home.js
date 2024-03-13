import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import SearchBar from "./commons/SearchBar";
import Card from "./commons/Card";
import { fetchCharactersData } from "../api/get-characters";
import { useFavorites } from "./commons/FavoritesContext";

const componentName = "Home-";

function Home() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);

  const { favoritesCounter, updateFavoritesCounter } = useFavorites();

  const handleFilterData = (searchText) => {
    if (isFavoritesActive) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFiltered(favorites);
    } else {
      if (Array.isArray(data)) {
        // Verifica que data sea un array
        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFiltered(filteredResults);
      }
    }
  };

  useEffect(() => {
    fetchCharactersData()
      .then((data) => {
        setData(data.data.results);
        setFiltered(data.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    handleFilterData(searchText);
  }, [searchText, isFavoritesActive]);

  const handleToggleFavorite = (isFavorite, item) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = isFavorite
      ? [...favorites, item]
      : favorites.filter((favorite) => favorite.id !== item.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    updateFavoritesCounter(updatedFavorites.length);
  };

  const handleShowFavorites = (isActive) => {
    setIsFavoritesActive(isActive);
  };

  const handleClearSearchText = () => {
    setSearchText("");
    setIsFavoritesActive(false);
  };

  return (
    <div className="main-container">
      <Header
        favoritesCounter={favoritesCounter}
        onShowFavorites={handleShowFavorites}
        clearSearchText={handleClearSearchText}
        isFavoritesActive={isFavoritesActive} // Agregar isFavoritesActive como prop
      />
      <div className={`${componentName}-container`}>
        {isFavoritesActive && (
          <p className={`${componentName}-favorites-title`}>favorites</p>
        )}
        <div className={`${componentName}-searchbar-container`}>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            handleFilterData={handleFilterData}
          />
        </div>
        {filtered.length > 0 ? (
          <div className={`${componentName}-product-list-container`}>
            {filtered.map((item, index) => (
              <Card
                key={index}
                data={item}
                isFavorite={
                  localStorage.getItem("favorites")
                    ? JSON.parse(localStorage.getItem("favorites")).some(
                        (favorite) => favorite.id === item.id
                      )
                    : false
                }
                onToggleFavorite={(isFavorite) =>
                  handleToggleFavorite(isFavorite, item)
                }
                isFavoritesActive={isFavoritesActive} // Pasar isFavoritesActive como prop
              />
            ))}
          </div>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
