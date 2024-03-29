import React, { useEffect } from "react";
import SearchIcon from "../../assets/search-icon.png";

const componentName = "SearchBar-";

function SearchBar({
  searchText,
  setSearchText,
  handleFilterData,
  filtered,
  isFavoritesActive,
  favoritesCounter,
}) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };

  useEffect(() => {
    const filteredData = () => {
      handleFilterData(searchText);
    };
    filteredData();
  }, [searchText, handleFilterData]);

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
      <div className={`${componentName}-search-count-container`}>
        <p className={`${componentName}-search-count`}>
          {isFavoritesActive ? (
            <span>{favoritesCounter} favorites</span>
          ) : filtered ? (
            filtered.length > 0 ? (
              <span>
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </span>
            ) : (
              "No results"
            )
          ) : (
            "Loading..."
          )}
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
