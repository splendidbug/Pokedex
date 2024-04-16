import React, { useState, useEffect } from "react";

const Home = ({ onPokemonClick }) => {
  // Conventionally, component names should start with a capital letter
  const [pokemon, setPokemon] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch("/api/getpokemons")
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.pokemons); // Assuming the API returns an object with a 'pokemons' array
      });
  }, []);

  // Corrected return statement
  return typeof pokemon === "undefined" || pokemon.length === 0 ? ( // Check if 'pokemon' is undefined or empty
    <p>Loading...</p>
  ) : (
    pokemon.map(
      (
        pokemon,
        i // Changed variable to 'pkm' for clarity in mapping
      ) => (
        <p key={i} onClick={() => onPokemonClick(pokemon.url)}>
          {pokemon.name}
        </p>
      )
    )
  );
};

export default Home; // Export should match the component name
