import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/vector.png";
import FavIcon from "../../assets/heart-filled.png";

const componentName = "Header-";

function Header(props) {
  return (
    <div className={`${componentName}-container`}>
      <div className={`${componentName}-logo-wrapper`}>
        <Link className={`${componentName}-logo-link`} to="/">
          <img
            className={`${componentName}-logo-image`}
            src={Logo}
            alt="Logo png"
          />
        </Link>
      </div>
      <div className={`${componentName}-favourites-wrapper`}>
        <img
          className={`${componentName}-favourites-icon`}
          src={FavIcon}
          alt="Favourites icon png"
        />
        <div className={`${componentName}-favourites-count`}>0</div>
      </div>
    </div>
  );
}

export default Header;
