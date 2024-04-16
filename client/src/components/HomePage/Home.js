import React, { useState, useEffect } from "react";

const Home = ({ onPokemonClick, pokemon }) => {
  return typeof pokemon === "undefined" ? ( // Check if 'pokemon' is undefined or empty
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
