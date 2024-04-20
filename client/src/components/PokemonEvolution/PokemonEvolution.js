import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import "./PokemonEvolution.css";
import pokeArrow from "../poke_arrow.svg";

const PokemonEvolution = ({ pokemonName, color }) => {
  const [pokemonEvolution, setPokemonEvolution] = useState();
  useEffect(() => {
    fetch(`/api/evolution?name=${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonEvolution(data);
      });
  }, []);

  const typeColors = {
    grass: { background: "#77cc55" },
    poison: { background: "#aa5599" },
    ice: { background: "#66ccff" },
    fire: { background: "#ff4422" },
    electric: { background: "#ffcc33" },
    water: { background: "#3399ff" },
    fighting: { background: "#bb5544" },
    ground: { background: "#ddbb55" },
    flying: { background: "#8899ff" },
    psychic: { background: "#ff5599" },
    bug: { background: "#aabb22" },
    rock: { background: "#bbaa66" },
    ghost: { background: "#6666bb" },
    dragon: { background: "#7766ee" },
    dark: { background: "#775544" },
    steel: { background: "#aaaabb" },
    fairy: { background: "#ee99ee" },
  };

  return pokemonEvolution === undefined || pokemonEvolution.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <>
      <p className="title">Evolution</p>
      <Grid container spacing={2} justifyContent="center">
        {pokemonEvolution?.map((pokemon, index) => (
          <>
            <Grid item xs={6} sm={4} md={2} key={"pokemon-" + index}>
              <Card className="evolutionCard" sx={{ height: 320, boxShadow: "none" /*backgroundColor: prominentColor*/ }}>
                <CardMedia component="img" alt="Pokemon" image={pokemon.img_front_default} className="evolutionImage" sx={{ width: "auto", height: 190, margin: "auto", justifyContent: "center", display: "block" }} />
                <p className="name">{pokemon.name}</p>
                {pokemon?.types?.map((type, typeIndex) => (
                  <Box key={"type-" + typeIndex} height={30} my={4} display="inline-flex" alignItems="center" gap={2} sx={{ border: "1px solid grey", bgcolor: typeColors[type.type.name.toLowerCase()]?.background || "#fb8500", paddingX: 1, whiteSpace: "nowrap", margin: 0.5, color: "white", borderRadius: "7px" }}>
                    {type.type.name}
                  </Box>
                ))}
              </Card>
            </Grid>

            {index < 2 && ( // Conditional rendering based on index
              <Card className="evolutionCard" key={"arrow-" + index} sx={{ maxWidth: 140, display: "flex", justifyContent: "center", alignItems: "center", border: "none", boxShadow: "none" /*backgroundColor: prominentColor*/ }}>
                <CardMedia component="img" alt="Pokemon" image={pokeArrow} className="evolutionImage" sx={{ maxWidth: 100, maxHeight: 100 }} />
              </Card>
            )}
          </>
        ))}
      </Grid>
    </>
  );
};

export default PokemonEvolution;
