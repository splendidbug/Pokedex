import React, { useState } from "react";

function ColorAnalyze() {
  const [colorOccurrences, setColorOccurrences] = useState({});

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      analyzeSVG(text);
    }
  };

  const analyzeSVG = (svgText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "C:\\Users\\shrey\\Desktop\\stuff\\assignments\\grad\\projects\\pokedex\\client\\src\\components\\poke_arrow.svg");
    const allElements = doc.querySelectorAll("*");
    const colorCount = {};

    allElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const color = style.fill || style.color;
      if (color) {
        colorCount[color] = (colorCount[color] || 0) + 1;
      }
    });

    setColorOccurrences(colorCount);
  };

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleFileChange} />
      <button onClick={() => console.log(colorOccurrences)}>Analyze Colors</button>
      <pre>{JSON.stringify(colorOccurrences, null, 2)}</pre>
    </div>
  );
}

export default ColorAnalyze;
