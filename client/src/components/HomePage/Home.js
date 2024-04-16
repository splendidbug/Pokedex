import React, { useState, useEffect } from "react";

const Home = ({ onPokemonClick, pokemon }) => {
  return typeof pokemon === "undefined" ? (
    <p>Loading...</p>
  ) : (
    pokemon.map((pokemon, i) => (
      <p key={i} onClick={() => onPokemonClick(pokemon.url)}>
        {pokemon.name}
      </p>
    ))
  );
};

export default Home;
