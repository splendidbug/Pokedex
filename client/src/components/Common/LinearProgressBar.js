import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";

function AnimatedLinearProgress({ targetValue }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= targetValue) {
          clearInterval(timer);
          return targetValue;
        }
        return Math.min(prevProgress + 1, targetValue);
      });
    }, 20); // Adjust this for faster or slower animation

    return () => {
      clearInterval(timer);
    };
  }, [targetValue]);

  // Function to determine color based on progress value
  const getColor = (value) => {
    if (value < 25) return "red";
    else if (value < 50) return "yellow";
    else if (value < 75) return "blue";
    else return "green";
  };

  return (
    <Box sx={{ width: "100%", height: 10, borderRadius: 5, overflow: "hidden" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          "& .MuiLinearProgress-bar": {
            // backgroundColor: getColor(progress),
            transition: "background-color 0.5s ease", // Apply transition to background-color
          },
        }}
      />
    </Box>
  );
}

export default AnimatedLinearProgress;
// Usage
// Fills up to 75% with animation
