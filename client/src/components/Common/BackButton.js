import React from "react";

function BackButton({ onBackButtonClick }) {
  return <div onClick={() => onBackButtonClick()}>BackButton</div>;
}

export default BackButton;
