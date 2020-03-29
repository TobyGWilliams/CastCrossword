import React from "react";

export default ({ gridSize, filled, number, letter }) => {
  if (!filled) return <div />;

  console.log(letter);

  return (
    <div
      style={{
        background: "white",
        position: "relative"
      }}
    >
      {number && (
        <div
          style={{
            margin: `calc(100vh/(${gridSize}*30))`,
            lineHeight: "1",
            fontSize: `calc(100vh/(${gridSize}*6))`,
            position: "absolute"
          }}
        >
          {number}
        </div>
      )}
      {letter && (
        <div
          style={{
            textAlign: "center",
            fontSize: `calc(100vh/(${gridSize}*1.4))`,
            lineHeight: "1.25",
            textTransform: "capitalize"
          }}
        >
          {letter}
        </div>
      )}
    </div>
  );
};
