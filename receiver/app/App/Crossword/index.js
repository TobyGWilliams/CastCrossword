import React from "react";
import Cell from "../Cell";



export default ({ grid, gridSize }) => (
  <div
    id="crossword-grid"
    style={{
      background: "black",
      display: "grid",
      flexGrow: 1,
      gridAutoRows: "1fr",
      gridGap: "3px",
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      height: "calc(100vh - 130px)",
      margin: "0 auto",
      padding: "5px",
      width: "calc(100vh - 130px)"
    }}
  >
    {grid.map(cell => (
      <Cell gridSize={gridSize} {...cell} />
    ))}
  </div>
);
