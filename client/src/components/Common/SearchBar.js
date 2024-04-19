import React, { useState } from "react";
import ReactSearchBox from "react-search-box";
const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  return (
    <ReactSearchBox
      placeholder="Search for a pokemon"
      leftIcon={<>🎨</>}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        onSearch(newValue);
      }}
      callback={(record) => console.log(record)}
      iconBoxSize="48px"
      style={{}}
    />
  );
};

export default SearchBar;
