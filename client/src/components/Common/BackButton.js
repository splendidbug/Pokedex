import React from "react";

function BackButton({ onBackButtonClick }) {
  return (
    <button className="LogOut" onClick={() => onBackButtonClick()}>
      Back
    </button>
  );
}

export default BackButton;
