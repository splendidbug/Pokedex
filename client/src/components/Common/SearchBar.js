import React, { useState } from "react";
import ReactSearchBox from "react-search-box";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <div className="SearchBarContainer">
      <ReactSearchBox
        className="ReactSearchBox"
        placeholder="Search for a pokemon"
        leftIcon={<SearchIcon />}
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
