import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const PokemonEvolution = ({ pokemonName }) => {
  const [pokemonEvolution, setPokemonEvolution] = useState();
  useEffect(() => {
    fetch(`/api/evolution?name=${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonEvolution(data);
      });
  }, []);

  const typeColors = {
    grass: { background: "#77cc55", text: "white" },
    poison: { background: "#aa5599", text: "white" },
    ice: { background: "#66ccff", text: "white" },
    fire: { background: "#ff4422", text: "white" },
    electric: { background: "#ffcc33", text: "white" },
    water: { background: "#3399ff", text: "white" },
    fighting: { background: "#bb5544", text: "white" },
    ground: { background: "#ddbb55", text: "white" },
    flying: { background: "#8899ff", text: "white" },
    psychic: { background: "#ff5599", text: "white" },
    bug: { background: "#aabb22", text: "white" },
    rock: { background: "#bbaa66", text: "white" },
    ghost: { background: "#6666bb", text: "white" },
    dragon: { background: "#7766ee", text: "white" },
    dark: { background: "#775544", text: "white" },
    steel: { background: "#aaaabb", text: "white" },
    fairy: { background: "#ee99ee", text: "white" },
  };

  return pokemonEvolution === undefined || pokemonEvolution.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <Grid container spacing={2} justifyContent="center">
      {pokemonEvolution.map((pokemon, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Card>
            <CardMedia component="img" alt="Pokemon" image={pokemon.img_front_default} sx={{ width: 300, height: 300 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "block" }} // This ensures that the text appears on a new line
            >
              {pokemon.name}
            </Typography>
            {pokemon.types.map((type, typeIndex) => (
              <Box key={index} height={30} my={4} display="inline-flex" alignItems="center" gap={2} sx={{ border: "1px solid grey", bgcolor: typeColors[type.type.name.toLowerCase()]?.background || "#fb8500", paddingX: 1, whiteSpace: "nowrap", margin: 0.5, color: typeColors[type.type.name]?.text || "#fefae0" }}>
                {type.type.name}
              </Box>
            ))}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonEvolution;
