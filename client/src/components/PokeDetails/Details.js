import React, { useState, useEffect } from "react";
import "./Details.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AnimatedLinearProgress from "../Common/LinearProgressBar";
import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import "./Details.css";

const Details = ({ pokemonUrl }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const parts = pokemonUrl.split("/");
    const pokemonId = parts[parts.length - 2];
    fetch(`/api/details?id=${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetails(data);
        console.log(data);
      });
  }, []);

  function getUniqueDescriptions(data) {
    const uniqueDescriptions = data.description.reduce((acc, current) => {
      // Remove \n and \f from flavor_text
      const cleanedText = current.flavor_text.replace(/[\n\f]/g, "");
      if (!acc.some((item) => item.flavor_text.replace(/[\n\f]/g, "") === cleanedText)) {
        // Add current item with cleaned flavor_text
        acc.push({ ...current, flavor_text: cleanedText });
      }
      return acc;
    }, []);

    return uniqueDescriptions;
  }

  const [pokemonDescription, setPokemonDescription] = useState([]);

  useEffect(() => {
    const parts = pokemonUrl.split("/");
    const pokemonId = parts[parts.length - 2];
    fetch(`/api/description?id=${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDescription(getUniqueDescriptions(data)); // Assuming the API returns an object with a 'pokemons' array
      });
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  return pokemonDetails.name === undefined ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <Card sx={{ maxWidth: 400 }}>
          {/* <p>{pokemon.url.split("/")[pokemon.url.split("/").length - 2]}</p> */}
          <CardMedia component="img" alt="Pokemon" image={pokemonDetails.img_front_default} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {capitalizeFirstLetter(pokemonDetails.name)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {"" + pokemonDescription[0]?.flavor_text + ". " + pokemonDescription[1]?.flavor_text}
            </Typography>
            <p className="heightWeight">Height: {pokemonDetails.height}</p>
            <p className="heightWeight">Weight: {pokemonDetails.weight}</p>
            {pokemonDetails?.types.map((type, index) => (
              <Box key={index} height={30} my={4} display="inline-flex" alignItems="center" gap={2} sx={{ border: "1px solid grey", bgcolor: typeColors[type.type.name.toLowerCase()]?.background || "#fb8500", paddingX: 1, whiteSpace: "nowrap", margin: 0.5, color: "white" }}>
                {type.type.name}
              </Box>
            ))}
            <p className="statsHeading">Stats:</p>
            {/* {console.log(pokemonDetails?.stats)} */}
            {pokemonDetails?.stats.map((stat, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2} marginTop={2} width="100%">
                <Typography variant="body2" color="text.secondary" component="span" sx={{ minWidth: "max-content" }}>
                  {stat.stat.name.toUpperCase()}:
                </Typography>
                <AnimatedLinearProgress targetValue={stat.base_stat} sx={{ flexGrow: 1, marginTop: 2, marginLeft: 1, height: "50px" }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </div>
      <PokemonEvolution pokemonName={pokemonDetails.name} />
    </>
  );
};

export default Details;

/*
    <div class="details">
      <h1>{capitalizeFirstLetter(pokemonDetails.name)}</h1>
      <img src={pokemonDetails.img_front_default}></img>
      <p>{"" + pokemonDescription[0]?.flavor_text + "\n" + pokemonDescription[1]?.flavor_text}</p>
    </div>


*/
