// Home.js
import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import SearchBar from "./commons/SearchBar";
import Card from "./commons/Card";
import { fetchData } from "../api";

const componentName = "Home-";

function Home(props) {
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData()
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
  };

  const handleToggleFavorite = (isFavorite, item) => {
    if (isFavorite) {
      setFavoriteCount((prevCount) => prevCount + 1);
      setFavorites([...favorites, item]);
    } else {
      setFavoriteCount((prevCount) => prevCount - 1);
      setFavorites(favorites.filter((favorite) => favorite.id !== item.id));
    }
  };

  const handleShowFavorites = () => {
    setFiltered(favorites);
  };

  const clearSearchText = () => {
    setSearchText("");
    setFiltered(data ? data.data.results : []); // Resetear los filtros de búsqueda
  };

  return (
    <div className="main-container">
      <Header
        favoritesCounter={favoriteCount}
        onShowFavorites={handleShowFavorites}
        clearSearchText={clearSearchText} // Pasar la función para limpiar el texto de búsqueda
      />
      <div className={`${componentName}-container`}>
        <div className={`${componentName}-searchbar-container`}>
          <SearchBar
            data={data ? data.data.results : []}
            setFiltered={handleFilteredResults}
            filtered={filtered}
            searchText={searchText}
            setSearchText={setSearchText} // Pasar el estado y la función para cambiar el texto de búsqueda
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
