import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/search-icon.png";

const componentName = "SearchBar-";

function SearchBar({ data, setFiltered, searchText, setSearchText }) {
  const [query, setQuery] = useState(searchText);
  const [filtered, setFilteredResults] = useState([]); // Definimos el estado de filtered

  useEffect(() => {
    setQuery(searchText);
  }, [searchText]);

  const handleChange = (event) => {
    const valor = event.target.value;
    setQuery(valor);
    setSearchText(valor);

    // Filtramos los datos basados en el valor de búsqueda
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(valor.toLowerCase())
    );

    // Actualizamos el estado de filtered
    setFilteredResults(filteredData);

    // Llamamos a la función setFiltered pasándole los datos filtrados
    setFiltered(filteredData);
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
          {filtered.length === 1
            ? `${filtered.length} result`
            : `${filtered.length} results`}
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
