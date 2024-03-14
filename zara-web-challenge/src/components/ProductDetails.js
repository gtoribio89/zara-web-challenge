import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "./commons/Header";
import { fetchCharacterData } from "../api/get-character";
import { fetchCharacterComicData } from "../api/get-character-comics";
import FavIcon from "../assets/heart-default.png";
import FavIconFilled from "../assets/heart-filled.png";
import { useFavorites } from "./commons/FavoritesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ComicItem from "./commons/ComicItem";

const componentName = "ProductDetails-";

function ProductDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const { favoritesCounter, updateFavoritesCounter } = useFavorites();
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIsFavorite = useCallback(
    (id) => {
      const favoriteIds = favorites.map((favorite) => favorite.id);
      return favoriteIds.includes(parseInt(id));
    },
    [favorites]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterData = await fetchCharacterData(id);
        setData(characterData);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const comicsData = await fetchCharacterComicData(id);
        setDataComics(comicsData);
      } catch (error) {
        console.error("Error fetching comics data:", error);
      }
    };
    fetchComicsData();
  }, [id]);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
    updateFavoritesCounter(favoritesFromStorage.length);

    setIsFavorite(checkIsFavorite(id));
  }, [id, favorites, updateFavoritesCounter, checkIsFavorite]);

  const toggleFavorite = () => {
    const character = data?.data?.results[0];
    const isCurrentlyFavorite = checkIsFavorite(id);

    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((favorite) => favorite.id !== character.id)
      : [...favorites, character];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    updateFavoritesCounter(updatedFavorites.length);
    setIsFavorite(!isCurrentlyFavorite);
  };

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 922,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
    cssEase: "linear",
    centerMode: false,
    centerPadding: "16px",
    variableWidth: false,
    arrows: true,
    draggable: true,
    focusOnSelect: false,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 5,
  };

  if (
    !data ||
    !data.data ||
    !data.data.results ||
    !dataComics ||
    !dataComics.data ||
    !dataComics.data.results
  ) {
    return null;
  }

  const character = data.data.results[0];
  const characterThumbnail = character.thumbnail;
  const characterName = character.name;
  const characterDescription = character.description;

  return (
    <div className="main-container">
      <Header favoritesCounter={favoritesCounter} />
      <div className={`${componentName}-container`}>
        <div className={`${componentName}-main-container`}>
          <div className={`${componentName}-main-layout`}>
            <div className={`${componentName}-character-image-container`}>
              <img
                className={`${componentName}-character-image`}
                src={`${characterThumbnail.path}.${characterThumbnail.extension}`}
                alt={characterName}
              />
            </div>
            <div className={`${componentName}-character-info-container`}>
              <div className={`${componentName}-title-container`}>
                <div className={`${componentName}-title`}>
                  <p className={`${componentName}-title-content`}>
                    {characterName}
                  </p>
                </div>
                <div
                  className={`${componentName}-favorites-container`}
                  onClick={toggleFavorite}
                >
                  <img
                    className={`${componentName}-favorites-icon`}
                    src={isFavorite ? FavIconFilled : FavIcon}
                    alt="Favorites icon"
                  />
                </div>
              </div>
              <div className={`${componentName}-description-container`}>
                <p className={`${componentName}-description-content`}>
                  {characterDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${componentName}-info-container`}>
          <div className={`${componentName}-info-layout`}>
            <div className={`${componentName}-info-title-container`}>
              <p className={`${componentName}-info-title-content`}>comics</p>
            </div>
            <div className={`${componentName}-info-slider-container`}>
              <Slider {...carouselSettings}>
                {dataComics.data.results.map((item, index) => (
                  <ComicItem
                    key={index}
                    index={index}
                    item={item}
                    data={data}
                    getYearFromDate={getYearFromDate}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
