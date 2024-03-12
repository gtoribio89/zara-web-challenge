import React, { useState, useEffect } from "react";
import Header from "./commons/Header";
import SearchBar from "./commons/SearchBar";
import Card from "./commons/Card";
import { fetchData } from "../api";

const componentName = "Home-";

function Home(props) {
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setFiltered(data.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleFilteredResults = (filteredResults) => {
    setFiltered(filteredResults);
  };

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="main-container">
      <Header />
      <div className={`${componentName}-container`}>
        <div className={`${componentName}-searchbar-container`}>
          <SearchBar
            data={data.data.results}
            setFiltered={handleFilteredResults}
            filtered={filtered}
          />
        </div>
        {filtered.length > 0 ? (
          <div className={`${componentName}-product-list-container`}>
            {filtered.map((item, index) => (
              <Card key={index} data={item} />
            ))}
          </div>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
