import React from "react";
import Header from "./commons/Header";

function Home(props) {
  return (
    <div>
      <Header />
      <h1>Home</h1>
      <h2>Hola, soy un componente básico de React</h2>
      <p>Este es un componente funcional que recibe props: {props.mensaje}</p>
    </div>
  );
}

export default Home;
