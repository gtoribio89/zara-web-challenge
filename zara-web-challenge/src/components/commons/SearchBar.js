// SearchBar.js
import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/search-icon.png";

const componentName = "SearchBar-";

function SearchBar({ data, setFiltered, filtered, searchText, setSearchText }) {
  const [query, setQuery] = useState(searchText);

  useEffect(() => {
    setQuery(searchText); // Actualizar el estado `query` cuando cambie el texto de búsqueda
  }, [searchText]);

  const handleChange = (event) => {
    const valor = event.target.value;
    setQuery(valor);
    setSearchText(valor); // Actualizar el texto de búsqueda en el estado

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(valor.toLowerCase())
    );
    setFiltered(filtered);
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
