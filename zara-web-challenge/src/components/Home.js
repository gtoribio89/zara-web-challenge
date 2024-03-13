import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import SearchBar from "./commons/SearchBar";
import Card from "./commons/Card";
import { fetchCharactersData } from "../api/get-characters";
import { useFavorites } from "./commons/FavoritesContext"; // Importar el contexto de favoritos

const componentName = "Home-";

function Home(props) {
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);

  const { favoritesCounter, updateFavoritesCounter } = useFavorites(); // Obtener el contador de favoritos del contexto

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

  const handleFilteredResults = (filteredResults) => {
    setFiltered(filteredResults);
    setIsFavoritesActive(false);
  };

  const handleToggleFavorite = (isFavorite, item) => {
    if (isFavorite) {
      setFavorites([...favorites, item]);
      updateFavoritesCounter(favoritesCounter + 1); // Incrementar el contador de favoritos en el contexto
    } else {
      setFavorites(favorites.filter((favorite) => favorite.id !== item.id));
      updateFavoritesCounter(favoritesCounter - 1); // Decrementar el contador de favoritos en el contexto
    }
  };

  const handleShowFavorites = () => {
    setFiltered(favorites);
    setIsFavoritesActive(true);
  };

  const handleClearSearchText = () => {
    setSearchText("");
    setFiltered(data ? data.data.results : []);
    setIsFavoritesActive(false); // Establecer isFavoritesActive a false al limpiar el texto de búsqueda
  };

  return (
    <div className="main-container">
      <Header
        favoritesCounter={favoritesCounter} // Pasar el contador de favoritos del contexto
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
            setFiltered={handleFilteredResults}
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
                isFavorite={favorites.some(
                  (favorite) => favorite.id === item.id
                )}
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
