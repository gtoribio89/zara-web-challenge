// En Card.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavIcon from "../../assets/heart-default.png";
import FavIconFilled from "../../assets/heart-filled.png";

const componentName = "Card-";

function Card(props) {
  const { data, isFavorite, onToggleFavorite } = props;

  const toggleFavorite = () => {
    onToggleFavorite(!isFavorite, data);
  };

  return (
    <div className={`${componentName}-character-container`}>
      <div className={`${componentName}-character-image-container`}>
        <Link className={`${componentName}-character-link`} to="/">
          <img
            className={`${componentName}-character-image`}
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt={"image of " + data.name}
          />
        </Link>
      </div>
      <div className={`${componentName}-character-info-container`}>
        <div className={`${componentName}-character-info-hover-effect`}></div>
        <div className={`${componentName}-character-name-container`}>
          <p className={`${componentName}-character-name`}>{data.name}</p>
        </div>
        <div
          className={`${componentName}-favorites-container`}
          onClick={toggleFavorite}
        >
          <img
            className={`${componentName}-favorites-icon`}
            src={isFavorite ? FavIconFilled : FavIcon}
            alt="Favorites icon png"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
