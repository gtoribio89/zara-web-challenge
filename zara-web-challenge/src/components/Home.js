import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import SearchBar from "./commons/SearchBar";
import Card from "./commons/Card";
import { fetchCharactersData } from "../api/get-characters";
import { useFavorites } from "./commons/FavoritesContext";

const componentName = "Home-";

function Home(props) {
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);

  const { favoritesCounter, updateFavoritesCounter } = useFavorites();

  useEffect(() => {
    fetchCharactersData()
      .then((data) => {
        setData(data);
        setFiltered(data.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    if (isFavoritesActive) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFiltered(favorites);
    } else {
      const filteredResults = data
        ? data.data.results.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];
      setFiltered(filteredResults);
    }
  }, [data, searchText, isFavoritesActive]);

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
      />
      <div className={`${componentName}-container`}>
        {isFavoritesActive && (
          <p className={`${componentName}-favorites-title`}>favorites</p>
        )}
        <div className={`${componentName}-searchbar-container`}>
          <SearchBar
            data={data ? data.data.results : []}
            setFiltered={setFiltered}
            filtered={filtered}
            searchText={searchText}
            setSearchText={setSearchText}
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
