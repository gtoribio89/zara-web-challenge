export async function fetchCharacterData(id) {
  const API_URL = "https://gateway.marvel.com:443/v1/public/characters/";
  const API_KEY = "91927be2abd19fa7330a6925d65153fe";
  const HASH = "fc6000da46eeda867c2c7f33fb8b2127";
  const TIMESTAMP = "1000";

  try {
    const response = await fetch(
      `${API_URL}${id}?ts=${TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}
