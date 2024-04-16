import React, { useState, useEffect } from "react";
import "./Details.css";

const Details = ({ pokemonUrl }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const parts = pokemonUrl.split("/");
    const pokemonId = parts[parts.length - 2];
    fetch(`/api/details?id=${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetails(data); // Assuming the API returns an object with a 'pokemons' array
        console.log(data);
      });
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return pokemonDetails.name === undefined ? (
    <h1>Loading...</h1>
  ) : (
    <div class="details">
      <h1>{capitalizeFirstLetter(pokemonDetails.name)}</h1>
      <img src={pokemonDetails.img_front_default}></img>
    </div>
  );
};

export default Details;
