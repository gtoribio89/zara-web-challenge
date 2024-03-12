import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import Card from "./commons/Card";
import { fetchData } from "../api";

const componentName = "Home-";

function Home(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  return (
    <div className="main-container">
      <Header />
      <div className={`${componentName}-container`}>
        <div className={`${componentName}-searchbar-container`}></div>
        {data ? (
          <div className={`${componentName}-product-list-container`}>
            {Object.entries(data.data.results).map((item, index) => (
              <Card data={item[1]} />
            ))}
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

export default Home;

/*<pre>{JSON.stringify(item[1], null, 2)}</pre>*/
