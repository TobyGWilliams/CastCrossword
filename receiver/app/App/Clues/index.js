import React from "react";

import Clue from "./Clue";

export default ({ clues }) => {
  return (
    <div
      style={{
        background: "white",
        height: "100vh",
        flexGrow: "1",
        padding: "5px"
      }}
    >
      <h1>Clues</h1>
      <h2>Across</h2>
      {clues.across.map(clue => (
        <Clue clue={clue} />
      ))}
      <h2>Down</h2>
      {clues.down.map(clue => (
        <Clue clue={clue} />
      ))}
    </div>
  );
};
