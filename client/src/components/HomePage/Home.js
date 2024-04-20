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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return pokemonDescription === undefined || pokemonDescription.length == 0 ? (
    <p>Loading...</p>
  ) : (
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
                maxWidth: 250,
                transition: "0.3s",
                paddingBottom: "10px",

                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Enhanced shadow on hover
                  transform: "scale(1.03)", // Slightly scale up the Card
                },
              }}
              onClick={() => onPokemonClick(pokemon.url)}
            >
              {/* <p>{pokemon.url.split("/")[pokemon.url.split("/").length - 2]}</p> */}
              <CardMedia
                component="img"
                alt="Pokemon"
                image={pokemonDetails[i]?.img_front_default}
                sx={{
                  height: 125, // Fixing the height to match max dimensions
                  width: "auto", // Fixing the width to match max dimensions
                  objectFit: "contain", // Ensures the image is scaled properly within the dimensions
                  margin: "auto", // This will center the image in the available space
                  display: "block", // Makes sure the image is treated as a block item to accept margin auto
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {capitalizeFirstLetter(pokemon?.name)}
                </Typography>
                <p style={{ fontSize: "13px" }}>{pokemonDescription[i]?.description?.[0]?.flavor_text}</p>
              </CardContent>
              {pokemonDetails[i]?.types.map((type, index) => (
                <Box key={index} height={30} my={4} display="inline-flex" alignItems="center" gap={2} sx={{ fontSize: "13px", border: "1px solid grey", bgcolor: typeColors[type.type.name.toLowerCase()]?.background || "#fb8500", paddingX: 1, whiteSpace: "nowrap", margin: 0.5, color: "white", borderRadius: "7px" }}>
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
