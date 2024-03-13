import React, { useEffect, useCallback } from "react";
import SearchIcon from "../../assets/search-icon.png";

const componentName = "SearchBar-";

function SearchBar({ searchText, setSearchText, handleFilterData }) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };

  // Utilizamos useCallback para envolver handleFilterData y asegurarnos de que no cambie en cada renderizado
  const memoizedHandleFilterData = useCallback(handleFilterData, []);

  useEffect(() => {
    memoizedHandleFilterData(searchText);
  }, [searchText, memoizedHandleFilterData]);

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
            value={searchText}
            onChange={handleChange}
            className={`${componentName}-search-bar`}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
