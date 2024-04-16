const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "userFour"] });
});

app.get("/api/getpokemons", (request, response) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=3000";
  axios
    .get(url)
    .then((res) => response.json({ pokemons: res.data.results }))
    .catch((err) => console.log(err));
});

app.get("/api/details", (request, response) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${request.query.id}/`;
  axios
    .get(url)
    .then((res) => {
      response.json({ stats: res.data.stats, height: res.data.height, moves: res.data.moves, types: res.data.types, weight: res.data.weight, name: res.data.name, img_front_default: res.data.sprites.other.dream_world.front_default, img_front_shiny: res.data.sprites.front_shiny });
      //   console.log(res.data.height);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
