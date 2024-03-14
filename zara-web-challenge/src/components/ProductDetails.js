import React, { useState, useEffect } from "react";
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

function ProductDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const { favoritesCounter, updateFavoritesCounter } = useFavorites();
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchCharacterData(id)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchCharacterComicData(id)
      .then((dataComics) => {
        setDataComics(dataComics);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
    updateFavoritesCounter(favoritesFromStorage.length);

    setIsFavorite(checkIsFavorite(id)); // Verificar si el elemento actual pertenece a favoritos
  }, []);

  const toggleFavorite = () => {
    const character = data.data.results[0];
    const isCurrentlyFavorite = checkIsFavorite(id);

    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((favorite) => favorite.id !== character.id)
      : [...favorites, character];

    setFavorites(updatedFavorites);
    updateFavoritesCounter(updatedFavorites.length);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(!isCurrentlyFavorite); // Invertimos el estado actual
  };

  const checkIsFavorite = (id) => {
    const favoriteIds = favorites.map((favorite) => favorite.id);
    return favoriteIds.includes(parseInt(id)); // Convertir a entero para comparar
  };

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();

    return year;
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Por defecto 2 elementos
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576, // Hasta 576px
        settings: {
          slidesToShow: 2, // Mostrar 2 elementos
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Desde 577px hasta 768px
        settings: {
          slidesToShow: 3, // Mostrar 3 elementos
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 922, // Desde 769px hasta 922px
        settings: {
          slidesToShow: 5, // Mostrar 5 elementos
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

  return (
    <div className="main-container">
      {<Header favoritesCounter={favoritesCounter} />}
      <div className={`${componentName}-container`}>
        <div className={`${componentName}-main-container`}>
          <div className={`${componentName}-main-layout`}>
            <div className={`${componentName}-character-image-container`}>
              <img
                className={`${componentName}-character-image`}
                src={
                  data.data.results[0].thumbnail.path +
                  "." +
                  data.data.results[0].thumbnail.extension
                }
                alt={"image of " + data.name}
              />
            </div>
            <div className={`${componentName}-character-info-container`}>
              <div className={`${componentName}-title-container`}>
                <div className={`${componentName}-title`}>
                  <p className={`${componentName}-title-content`}>
                    {data.data.results[0].name}
                  </p>
                </div>
                <div
                  className={`${componentName}-favorites-container`}
                  onClick={toggleFavorite}
                >
                  <img
                    className={`${componentName}-favorites-icon`}
                    src={checkIsFavorite(id) ? FavIconFilled : FavIcon}
                    alt="Favorites icon png"
                  />
                </div>
              </div>
              <div className={`${componentName}-description-container`}>
                <p className={`${componentName}-description-content`}>
                  {data.data.results[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${componentName}-info-container`}>
          <div className={`${componentName}-info-layout`}>
            <div className={`${componentName}-info-title-conatiner`}>
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
