import React from "react";
import Cell from "../Cell";



export default ({ grid, gridSize }) => (
  <div
    style={{
      background: "black",
      padding: "5px",
      width: "100vh",
      height: "100vh",
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridGap: "3px",
      gridAutoRows: "1fr"
    }}
  >
    {grid.map(cell => (
      <Cell gridSize={gridSize} {...cell} />
    ))}
  </div>
);
