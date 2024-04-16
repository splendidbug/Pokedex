import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "../HomePage/Home";
import Details from "../PokeDetails/Details";
import BackButton from "../Common/BackButton";
import SearchBar from "../Common/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton"; // Assuming you have this component
import LogoutButton from "../LogoutButton"; // Assuming you have this component

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

  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          {currentView === "home" ? (
            <div>
              <SearchBar onSearch={handleSearch} />
              <HomePage onPokemonClick={handlePokemonClick} pokemon={filteredPokemons} />
              <LogoutButton />
            </div>
          ) : (
            <div>
              <BackButton onBackButtonClick={handleBackButtonClick} />
              <Details pokemonUrl={selectedUrl} />
              <LogoutButton />
            </div>
          )}
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default App;
