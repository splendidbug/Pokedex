import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Mock data, replace with your actual data
const pokemons = [
  { id: "0001", name: "Bulbasaur", types: ["Grass", "Poison"], image: "bulbasaur.png" },
  { id: "0002", name: "Ivysaur", types: ["Grass", "Poison"], image: "ivysaur.png" },
  { id: "0003", name: "Venusaur", types: ["Grass", "Poison"], image: "venusaur.png" },
];

const typeColors = {
  Grass: "#78C850", // Green
  Poison: "#A040A0", // Purple
};

function PokemonEvolutionCard({ pokemon }) {
  return (
    <Card sx={{ maxWidth: 140, mx: 1, bgcolor: "black", borderRadius: "10px" }}>
      <CardMedia
        component="img"
        image={pokemon.image} // Replace with your actual image paths
        alt={pokemon.name}
        sx={{ padding: "10px", bgcolor: "lightgray", borderRadius: "10px" }}
      />
      <CardContent sx={{ bgcolor: "black", color: "white", textAlign: "center" }}>
        <Typography gutterBottom variant="subtitle1">
          {pokemon.id}
        </Typography>
        <Typography variant="h6">{pokemon.name}</Typography>
        {pokemon.types.map((type) => (
          <Box
            key={type}
            sx={{
              bgcolor: typeColors[type],
              borderRadius: "20px",
              py: "2px",
              px: "10px",
              mt: "5px",
              display: "inline-block",
              color: "black", // Text color
            }}
          >
            {type}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function PokemonEvolution() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2, bgcolor: "#333" }}>
      {pokemons.map((pokemon, index) => (
        <React.Fragment key={pokemon.id}>
          <PokemonEvolutionCard pokemon={pokemon} />
          {index < pokemons.length - 1 && (
            <IconButton sx={{ color: "yellow" }}>
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default PokemonEvolution;
