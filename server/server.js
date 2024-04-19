const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");
const cors = require("cors");
const path = require("path");
app.use(cors());

const PORT = process.env.PORT || 8080;

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

app.get("/api/description", (request, response) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${request.query.id}/`;
  axios
    .get(url)
    .then((res) => {
      response.json({ description: res.data.flavor_text_entries.filter((entry) => entry.language.name === "en") });
    })
    .catch((err) => console.log(err));
});

// app.get("/api/evolution", (request, response) => {
//   const url = `https://pokeapi.co/api/v2/pokemon-species/${request.query.name}`;
//   axios.get(url).then((res) => {
//     const evolution_url = res.data.evolution_chain.url;
//     axios
//       .get(evolution_url)
//       .then((res) => {
//         response.json({ first: res.data.chain.species.url, second: res.data.chain.evolves_to[0].species.url, third: res.data.chain.evolves_to[0].evolves_to[0].species.url });
//       })
//       .catch((err) => console.log(err));
//   });
// });

app.get("/api/evolution", async (request, response) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${request.query.name}`;
    const speciesResult = await axios.get(url);
    const evolutionUrl = speciesResult.data.evolution_chain.url;

    const evolutionResult = await axios.get(evolutionUrl);
    const chain = evolutionResult.data.chain;
    const result = { first: chain.species.url, second: chain.evolves_to[0].species.url, third: chain.evolves_to[0].evolves_to[0].species.url };
    var results = [];
    for (const key of Object.keys(result)) {
      const url = result[key];
      const parts = url.split("/");
      const pokemonId = parts[parts.length - 2];
      const response = await fetch(request.protocol + "://" + request.headers.host + `/api/details?id=${pokemonId}`);
      const data = await response.json();
      results.push(data);
    }

    response.json(results);
  } catch (error) {
    console.error("Error fetching evolution data:", error.message);
    response.status(500).json({ error: "Failed to retrieve evolution data" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
