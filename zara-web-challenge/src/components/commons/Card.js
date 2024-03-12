import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavIcon from "../../assets/heart-default.png";
import FavIconFilled from "../../assets/heart-filled.png";

const componentName = "Card-";

function Card(props) {
  const { data, onToggleFavorite } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(!isFavorite);
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
          className={`${componentName}-favourite-container`}
          onClick={toggleFavorite}
        >
          <img
            className={`${componentName}-favourite-icon`}
            src={!isFavorite ? FavIcon : FavIconFilled}
            alt="Favourites icon png"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
