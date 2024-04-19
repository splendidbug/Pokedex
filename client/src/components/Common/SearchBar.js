import React, { useState } from "react";
import ReactSearchBox from "react-search-box";
import "./SearchBar.css";
const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <div className="SearchBarContainer">
      <ReactSearchBox
        className="ReactSearchBox"
        placeholder="Search for a pokemon"
        leftIcon={<>🎨</>}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onSearch(newValue);
        }}
        callback={(record) => console.log(record)}
        iconBoxSize="48px"
        // style={{ borderRadius: "35px" }} // Example to control maximum width
      />
    </div>
  );
};

export default SearchBar;
