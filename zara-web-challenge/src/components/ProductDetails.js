import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./commons/Header";
import { fetchCharacterData } from "../api/get-character";
import FavIcon from "../assets/heart-default.png";
import FavIconFilled from "../assets/heart-filled.png";
import { useFavorites } from "./commons/FavoritesContext";

const componentName = "ProductDetails-";

function ProductDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);
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

  if (!data || !data.data || !data.data.results) {
    return null;
  }

  return (
    <div>
      <Header favoritesCounter={favoritesCounter} />
      <h1>ProductDetails</h1>
      <p>Este es un componente funcional que recibe props: {props.mensaje}</p>
      <div>El ID proporcionado en la URL es: {id}</div>
      <div>
        <div>
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
        <div>{data.data.results[0].name}</div>
        <div>{data.data.results[0].description}</div>
        <div>comics</div>
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
  );
}

export default ProductDetails;
