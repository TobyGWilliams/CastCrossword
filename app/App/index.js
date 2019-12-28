import React from "react";

import Crossword from "./Crossword";
import Clues from "./Clues";

// https://github.com/doshea/nyt_crosswords
import nyPuzzle from "./ny-puzzle-converter"; 

const { gridSize, grid, clues } = nyPuzzle();

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Crossword grid={grid} gridSize={gridSize} />
      <Clues clues={clues} />
    </div>
  );
}
