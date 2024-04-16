import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "../HomePage/Home";
import Details from "../PokeDetails/Details";
import BackButton from "../Common/BackButton";
const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedUrl, setSelectedUrl] = useState("");

  const handlePokemonClick = (url) => {
    setSelectedUrl(url);
    setCurrentView("details");
  };

  const handleBackButtonClick = () => {
    setSelectedUrl("");
    setCurrentView("home");
  };
  return (
    <div className="App">
      {currentView === "home" ? (
        <HomePage onPokemonClick={handlePokemonClick} />
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
