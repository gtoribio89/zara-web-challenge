// Header.js
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/vector.png";
import FavIcon from "../../assets/heart-filled.png";

const componentName = "Header-";

function Header(props) {
  const { favoritesCounter, onShowFavorites, clearSearchText } = props;

  const handleLogoClick = () => {
    if (typeof clearSearchText === "function") {
      clearSearchText(); // Limpiar el texto de búsqueda
    }
  };

  return (
    <div className={`${componentName}-container`}>
      <div className={`${componentName}-logo-wrapper`}>
        <Link
          className={`${componentName}-logo-link`}
          to="/"
          onClick={handleLogoClick}
        >
          <img
            className={`${componentName}-logo-image`}
            src={Logo}
            alt="Logo png"
          />
        </Link>
      </div>
      <div
        className={`${componentName}-favorites-wrapper`}
        onClick={onShowFavorites}
      >
        <img
          className={`${componentName}-favorites-icon`}
          src={FavIcon}
          alt="Favorites icon png"
        />
        <div className={`${componentName}-favorites-count`}>
          {favoritesCounter}
        </div>
      </div>
    </div>
  );
}

export default Header;
