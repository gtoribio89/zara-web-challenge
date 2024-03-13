import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./commons/Header";
import { fetchCharacterData } from "../api/get-character";
import { useFavorites } from "./commons/FavoritesContext";
import FavIcon from "../assets/heart-default.png";
import FavIconFilled from "../assets/heart-filled.png";

const componentName = "ProductDetails-";

function ProductDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { favoritesCounter, updateFavoritesCounter } = useFavorites(); // Obtener el contador de favoritos del contexto
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchCharacterData(id) // Pasar el ID como parámetro a la función de obtención de datos
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]); // Agregar 'id' como dependencia para que se vuelva a buscar cuando cambie

  useEffect(() => {
    // Verificar si el personaje actual es un favorito
    if (data && data.data && data.data.results) {
      const favorite = localStorage.getItem(data.data.results[0].id);
      setIsFavorite(favorite ? true : false);
    }
  }, [data]);

  const toggleFavorite = () => {
    if (!isFavorite) {
      updateFavoritesCounter(favoritesCounter + 1); // Incrementar el contador de favoritos en el contexto
      localStorage.setItem(data.data.results[0].id, true);
    } else {
      updateFavoritesCounter(favoritesCounter - 1); // Decrementar el contador de favoritos en el contexto
      localStorage.removeItem(data.data.results[0].id);
    }
    setIsFavorite(!isFavorite);
  };

  // Verificar si data es null antes de acceder a sus propiedades
  if (!data || !data.data || !data.data.results) {
    return null; // Si data es null, retornar null o cualquier otro componente de carga
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
          src={isFavorite ? FavIconFilled : FavIcon}
          alt="Favorites icon png"
        />
      </div>
    </div>
  );
}

export default ProductDetails;
