import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
} from "@material-ui/core";
import ExtensionIcon from "@material-ui/icons/Extension";

import { centerText, centerPercentColumn } from "../../../styles";

const CenterColumn = ({ children }) => (
  <div style={centerPercentColumn(75)}>{children}</div>
);

const PuzzleCard = ({ onSelectPuzzle, puzzle }) => {
  const { meta, size } = puzzle;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={meta.title} />
        <CardContent>
          {meta.author}
          <br />
          {size.rows}x{size.columns}
        </CardContent>
        <CardActions>
          <Button
            style={{ margin: "auto 0 auto auto" }}
            variant="outlined"
            onClick={() => onSelectPuzzle(puzzle)}
            startIcon={<ExtensionIcon />}
          >
            Play
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ({ onSelectPuzzle, puzzles }) => (
  <CenterColumn>
    <h1 style={{ ...centerText }}>Puzzle Selector</h1>
    <h2>Built in puzzles</h2>
    <Grid container spacing={1}>
      {puzzles.map((puzzle) => (
        <PuzzleCard onSelectPuzzle={onSelectPuzzle} puzzle={puzzle} />
      ))}
    </Grid>

    <h2>Way to build your own</h2>
    <h2>Import from URL</h2>
  </CenterColumn>
);
