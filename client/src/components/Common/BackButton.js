import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../LogInOutButton.css";

function BackButton({ onBackButtonClick }) {
  return (
    <div className="backButton" onClick={() => onBackButtonClick()}>
      {<ArrowBackIcon sx={{ fontSize: 25 }} />}
    </div>
  );
}

export default BackButton;
