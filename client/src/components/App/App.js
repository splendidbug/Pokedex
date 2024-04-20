import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import HomePage from "../HomePage/Home";
import Details from "../PokeDetails/Details";
import BackButton from "../Common/BackButton";
import SearchBar from "../Common/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton"; // Assuming you have this component
import LogoutButton from "../LogoutButton"; // Assuming you have this component
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const pokemonIndex = useRef(0);
  const [scrolledPokemons, setScrolledPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    if (pokemons.length === 0) {
      fetch(`/api/getpokemons?offset=0&limit=2000`)
        .then((response) => response.json())
        .then((data) => {
          setPokemons(data.pokemons);
          setFilteredPokemons(data.pokemons);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    }

    // Set up scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pokemons]);

  useEffect(() => {
    if (pokemons.length > 0) {
      console.log("Loading initial batch of displayed pokemons");
      loadMorePokemons(); // Load initial batch to display
    }
  }, [pokemons]); // This useEffect depends on `pokemons`

  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView; // Update ref on each render

  const handleScroll = () => {
    // Adding a threshold of 100 pixels to ensure the event triggers before exactly reaching the bottom
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || currentViewRef.current === "details") {
      return;
    }
    console.log(currentView);
    console.log("Bottom reached, loading more items");

    loadMorePokemons();
  };

  const loadMorePokemons = () => {
    console.log(currentViewRef.current);
    if (filteredPokemons.length > 0) {
      console.log("loading more pokemons");
      const nextItems = filteredPokemons.slice(pokemonIndex.current, pokemonIndex.current + 20);
      setScrolledPokemons((prev) => [...prev, ...nextItems]);
      pokemonIndex.current += 20;
    }
  };

  const [searchedText, setSearchedText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const handleSearch = (searchText) => {
    setSearchedText(searchText);
    const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase()));
    pokemonIndex.current = 0;
    setFilteredPokemons(filtered);
    setScrolledPokemons([]);
    loadMorePokemons();
  };
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          {currentView === "home" ? (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                <div style={{ flexGrow: 1, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "25px" }}>Pokédex</p>
                </div>
                <LogoutButton style={{ marginLeft: "auto" }} />
              </div>

              <div style={{ marginTop: "15px" }}>
                <SearchBar onSearch={handleSearch} />
                <HomePage onPokemonClick={handlePokemonClick} pokemon={scrolledPokemons} />
                {/* {searchedText === "" ? <HomePage onPokemonClick={handlePokemonClick} pokemon={pokemons} /> : <HomePage onPokemonClick={handlePokemonClick} pokemon={filteredPokemons} />} */}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                <BackButton onBackButtonClick={handleBackButtonClick} />
                <div style={{ flexGrow: 1, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "25px" }} onClick={() => setCurrentView("home")}>
                    Pokédex
                  </p>
                </div>
                <LogoutButton style={{ marginLeft: "auto" }} />
              </div>
              <Details pokemonUrl={selectedUrl} />
            </>
          )}
        </>
      ) : (
        <>
          <div className="topText">
            <p style={{ margin: 0, fontSize: "35px" }}>
              I <FavoriteIcon sx={{ fontSize: 35, position: "relative", top: "4px" }} /> Pokemon
            </p>
          </div>

          <div className="centerContent">
            <LoginButton />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
