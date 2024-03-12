import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./commons/Header";
import { fetchCharacterData } from "../api/get-character";
import { useFavorites } from "./commons/FavoritesContext";

const componentName = "ProductDetails-";

function ProductDetails(props) {
  const { id } = useParams(); // Obtener el parámetro ID de la URL
  const [data, setData] = useState(null);
  const { favoritesCounter, setFavoritesCounter } = useFavorites();

  useEffect(() => {
    fetchCharacterData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  if (!data || !data.data.results) {
    return null;
  }

  const incrementCounter = () => {
    setFavoritesCounter(favoritesCounter + 1);
  };

  const decrementCounter = () => {
    setFavoritesCounter(favoritesCounter - 1);
  };

  return (
    <div>
      <Header />
      <h1>ProductDetails</h1>
      <h1>ProductDetails</h1>
      <p>Este es un componente funcional que recibe props: {props.mensaje}</p>
      <div>El ID proporcionado en la URL es: {id}</div>
      {/* Mostrar la información del personaje */}
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
      <div>
        <button onClick={incrementCounter}>Incrementar contador</button>
        <button onClick={decrementCounter}>Decrementar contador</button>
      </div>
    </div>
  );
}

export default ProductDetails;
