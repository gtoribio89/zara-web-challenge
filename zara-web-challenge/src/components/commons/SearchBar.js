import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/search-icon.png";

const componentName = "SearchBar-";

function SearchBar({
  data,
  setFiltered,
  searchText,
  setSearchText,
  isFavoritesActive,
  favoritesCounter,
}) {
  const [query, setQuery] = useState(searchText);
  const [filtered, setFilteredResults] = useState([]);

  useEffect(() => {
    setQuery(searchText);
    filterData(searchText);
  }, [searchText, data, setFiltered, isFavoritesActive]);

  const handleChange = (event) => {
    const valor = event.target.value;
    setQuery(valor);
    setSearchText(valor);
    filterData(valor);
  };

  const filterData = (searchText) => {
    if (isFavoritesActive) {
      // Cuando los favoritos están activos, no es necesario filtrar los datos
      setFilteredResults(data);
    } else {
      // Cuando los favoritos no están activos, filtramos los datos según el texto de búsqueda
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredResults(filteredData);
      setFiltered(filteredData);
    }
  };

  return (
    <div className={`${componentName}-container`}>
      <div className={`${componentName}-search-main-container`}>
        <div className={`${componentName}-search-icon-container`}>
          <img
            className={`${componentName}-search-icon`}
            src={SearchIcon}
            alt="Search icon png"
          />
        </div>
        <div className={`${componentName}-search-bar-container`}>
          <input
            type="text"
            placeholder="search a character..."
            value={query}
            onChange={handleChange}
            className={`${componentName}-search-bar`}
          />
        </div>
      </div>
      <div className={`${componentName}-search-count-container`}>
        <p className={`${componentName}-search-count`}>
          {isFavoritesActive
            ? `${favoritesCounter} favorites`
            : filtered.length === 1
            ? `${filtered.length} result`
            : `${filtered.length} results`}
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
