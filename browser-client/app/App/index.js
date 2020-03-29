import React, { useState, Fragment } from "react";
import { Button } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

import Clues from "./Clues";
import crosswordPuzzle from "./data.json";

import htmlDecode from "../util/html-decode";
import nyPuzzle from "./ny-puzzle-converter"; // https://github.com/doshea/nyt_crosswords

import { centerText, flexAlignCenter } from "../styles";

nyPuzzle(crosswordPuzzle);

const App = () => {
  const [puzzle, setPuzzle] = useState();
  const [selectedClue, setSelectedClue] = useState("");

  const onClueClick = clue => () => {
    setSelectedClue(clue);
  };

  const onClueChange = clue => value => {
    console.log(clue, value);
  };

  const buttonClick = () => {
    const CHANNEL_CROSSWORD = "urn:x-cast:crossword";
    const CHANNEL_CLUE = "urn:x-cast:clue";

    const context = cast.framework.CastContext.getInstance();
    const session = context.getCurrentSession();

    session
      .sendMessage(CHANNEL_CLUE, JSON.stringify({ message: selectedClue }))
      .then(() => {
        console.log("message sent");
      })
      .catch(err => {
        console.error("unable to send message", err);
      });
  };

  const clueMessage = (
    <p style={centerText}>{`Selected clue: ${htmlDecode(selectedClue)}`}</p>
  );
  const selectClueMessage = (
    <p style={centerText}>
      Click the
      <span style={{margin: '0 10px'}}>
        <AddToQueue />
      </span>
      icon to select a clue for everybody to work on
    </p>
  );

  return (
    <div style={{ margin: "10px" }}>
      <h1 style={centerText}>ClueCrossword</h1>
      {!puzzle && (
        <Fragment>
          <p style={centerText}>Please select a puzzle</p>
          <div style={flexAlignCenter}>
            <Button
              variant="outlined"
              onClick={() => {
                console.log("load the puzzle!");
                setPuzzle(nyPuzzle(crosswordPuzzle));
              }}
            >
              HAHAHA There is only one puzzle!
            </Button>
          </div>
        </Fragment>
      )}
      {puzzle && (
        <Fragment>
          <div>{selectedClue ? clueMessage : selectClueMessage}</div>
          <div>
            <Clues
              clues={puzzle.clues}
              onClueClick={onClueClick}
              onClueChange={onClueChange}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default App;
