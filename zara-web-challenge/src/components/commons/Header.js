import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/vector.png";
import FavIcon from "../../assets/heart-filled.png";

const componentName = "Header-";

function Header(props) {
  const { favoritesCounter, onShowFavorites, clearSearchText } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const { isFavoritesActive } = props;

  const handleLogoClick = () => {
    navigate("/");
    if (typeof clearSearchText === "function") {
      clearSearchText();
    }
  };

  const handleShowFavorites = () => {
    if (location.pathname === "/") {
      if (!isFavoritesActive && typeof onShowFavorites === "function") {
        onShowFavorites(true);
      }
    } else {
      navigate("/");
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
        onClick={handleShowFavorites}
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
