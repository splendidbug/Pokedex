import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./Home.css";

const Home = ({ onPokemonClick, pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  useEffect(() => {
    const fetchPokemonDescription = async () => {
      const details = await Promise.all(
        pokemon.map(async (poke) => {
          const parts = poke.url.split("/");
          const pokemonId = parts[parts.length - 2];
          const response = await fetch(`/api/details?id=${pokemonId}`);
          const data = await response.json();
          return data; // Assuming each fetch returns details for one Pokémon
        })
      );

      setPokemonDetails(details);
    };

    fetchPokemonDescription().catch(console.error);
  }, [pokemon]); // Dependency array includes `pokemon` to refetch when it changes

  const [pokemonDescription, setPokemonDescription] = useState([]);
  useEffect(() => {
    const fetchPokemonDescription = async () => {
      const description = await Promise.all(
        pokemon.map(async (poke) => {
          const parts = poke.url.split("/");
          const pokemonId = parts[parts.length - 2];
          const response = await fetch(`/api/description?id=${pokemonId}`);
          const data = await response.json();
          return data; // Assuming each fetch returns details for one Pokémon
        })
      );

      setPokemonDescription(description);
    };

    fetchPokemonDescription().catch(console.error);
  }, [pokemon]); // Dependency array includes `pokemon` to refetch when it changes

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

  return pokemonDescription === undefined || pokemonDescription.length == 0 ? (
    <p>Loading...</p>
  ) : (
    // pokemon.map((pokemon, i) => (
    //   <p key={i} onClick={() => onPokemonClick(pokemon.url)}>
    //     {pokemon.name}
    //   </p>
    // ))

    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Grid className="grid1" container style={{ width: "80%", margin: 0, padding: 0, rowGap: "26px" }}>
        {/* spacing={2} adds some space between grid items */}
        {pokemon.map((pokemon, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={i}
            style={{
              width: "calc(25% - 4px)", // Adjust this calculation based on your desired spacing
              padding: 2, // Optional: depends on your design
            }}
          >
            {/* xs=12 makes it full width on extra small devices, and md=3 makes it use 4 columns out of 12 on medium devices and larger */}
            <Card
              sx={{
                maxWidth: 300,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Enhanced shadow on hover
                  transform: "scale(1.03)", // Slightly scale up the Card
                },
              }}
              onClick={() => onPokemonClick(pokemon.url)}
            >
              {/* <p>{pokemon.url.split("/")[pokemon.url.split("/").length - 2]}</p> */}
              <CardMedia component="img" alt="Pokemon" image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[pokemon.url.split("/").length - 2]}.png`} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pokemonDescription[i]?.description?.[0]?.flavor_text}
                </Typography>
              </CardContent>
              {pokemonDetails[i]?.types.map((type, index) => (
                <Box key={index} height={30} my={4} display="inline-flex" alignItems="center" gap={2} sx={{ border: "1px solid grey", bgcolor: typeColors[type.type.name.toLowerCase()]?.background || "#fb8500", paddingX: 1, whiteSpace: "nowrap", margin: 0.5, color: "white", borderRadius: "7px" }}>
                  {type.type.name}
                </Box>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
