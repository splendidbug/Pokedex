import React, { useState, useEffect } from "react";

const Details = ({ pokemonUrl }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const parts = pokemonUrl.split("/");
    const pokemonId = parts[parts.length - 2];
    fetch(`/api/details?id=${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetails(data.stats); // Assuming the API returns an object with a 'pokemons' array
        console.log(data.weight);
      });
  }, []);

  return (
    <div>
      <h1>Pokémon Details</h1>
      <p>URL: {pokemonUrl}</p>
    </div>
  );
};

export default Details;
