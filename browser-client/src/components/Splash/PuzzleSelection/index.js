import React from "react";
import { Button } from "@material-ui/core";
import ExtensionIcon from "@material-ui/icons/Extension";

import { centerText, centerPercentColumn } from "../../../styles";

console.log(centerText);

const CenterColumn = ({ children }) => (
  <div style={centerPercentColumn(75)}>{children}</div>
);

export default ({ onSelectPuzzle }) => {
  return (
    <CenterColumn>
      <h1 style={{ ...centerText }}>Puzzle Selector</h1>
      <h2>Built in puzzles</h2>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSelectPuzzle}
        startIcon={<ExtensionIcon />}
      >
        New York Times - 28th December 2019
      </Button>
      <h2>Way to build your own</h2>
      <h2>Import from URL</h2>
    </CenterColumn>
  );
};
