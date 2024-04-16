import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "../HomePage/Home";
import Details from "../PokeDetails/Details";
import BackButton from "../Common/BackButton";
import SearchBar from "../Common/SearchBar";
const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const handlePokemonClick = (url) => {
    setSelectedUrl(url);
    setCurrentView("details");
  };

  const [selectedUrl, setSelectedUrl] = useState("");
  const handleBackButtonClick = () => {
    setSelectedUrl("");
    setCurrentView("home");
  };

  const [pokemons, setPokemon] = useState([]); // Initialize as an empty array
  useEffect(() => {
    fetch("/api/getpokemons")
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.pokemons);
        setFilteredPokemons(data.pokemons);
      });
  }, []);

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleSearch = (searchText) => {
    const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPokemons(filtered);
  };

  return (
    <div className="App">
      {currentView === "home" ? (
        <div>
          <SearchBar onSearch={handleSearch} />
          <HomePage onPokemonClick={handlePokemonClick} pokemon={filteredPokemons} />
        </div>
      ) : (
        <div>
          <BackButton onBackButtonClick={handleBackButtonClick} />
          <Details pokemonUrl={selectedUrl} />
        </div>
      )}
    </div>
  );
};

export default App;
