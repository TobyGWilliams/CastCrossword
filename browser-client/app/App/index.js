import React, { useState, Fragment } from "react";
import { Button } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

import Clues from "../Clues";
import htmlDecode from "../util/html-decode";
import rawPuzzle from "../puzzles/ny-times-2019-12-28.json";
import convertToGrid from "../util/convert-to-grid";

import { centerText, flexAlignCenter, zeroMarginBottom } from "../styles";
import Crossword from "../Crossword";

const CHANNEL_CROSSWORD = "urn:x-cast:crossword";
const CHANNEL_CLUE = "urn:x-cast:clue";

const App = () => {
  const [puzzle, setPuzzle] = useState();
  const [selectedClue, setSelectedClue] = useState("");

  const onPuzzleLoad = () => {
    updatePuzzle(rawPuzzle);
  };

  const onClueClick = clue => () => {
    sendClue(clue);
    setSelectedClue(clue);
  };

  const onClueChange = clue => value => {
    const newPuzzle = {
      ...puzzle,
      clues: {
        ...puzzle.clues,
        [clue.key]: { ...puzzle.clues[clue.key], guess: value }
      }
    };
    updatePuzzle(newPuzzle);
  };

  const updatePuzzle = newPuzzle => {
    const toBePuzzle = {
      ...newPuzzle,
      cells: convertToGrid(newPuzzle)
    };
    setPuzzle(toBePuzzle);
    sendPuzzle(toBePuzzle);
  };

  const sendPuzzle = puzzle =>
    sendMessage(CHANNEL_CROSSWORD, JSON.stringify({ puzzle }));

  const sendClue = clue =>
    sendMessage(CHANNEL_CLUE, JSON.stringify({ clue: clue.description }));

  const sendMessage = (channel, message) => {
    const context = cast.framework.CastContext.getInstance();
    const session = context.getCurrentSession();

    session
      .sendMessage(channel, message)
      .then(() => {
        console.info("message sent", channel);
      })
      .catch(err => {
        console.error("unable to send message", channel, err);
      });
  };

  const clueMessage = (
    <p style={centerText}>{`Selected clue: ${htmlDecode(
      selectedClue.description
    )}`}</p>
  );

  const selectClueMessage = (
    <p style={centerText}>
      Click the
      <span style={{ margin: "0 10px" }}>
        <AddToQueue />
      </span>
      icon to select a clue for everybody to work on
    </p>
  );

  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
          height: "120px"
        }}
      >
        <h1 style={{ ...centerText, margin: 0 }}>ClueCrossword</h1>
        {puzzle && <div>{selectedClue ? clueMessage : selectClueMessage}</div>}
        {!puzzle && (
          <Fragment>
            <p style={centerText}>Please select a puzzle</p>
            <div style={flexAlignCenter}>
              <Button variant="outlined" onClick={onPuzzleLoad}>
                HAHAHA There is only one puzzle!
              </Button>
            </div>
          </Fragment>
        )}
      </div>

      {puzzle && (
        <Fragment>
          <Crossword grid={puzzle.cells} gridSize={puzzle.size.columns} />
          <div>{selectedClue ? clueMessage : selectClueMessage}</div>
          <Clues
            clues={puzzle.clues}
            onClueClick={onClueClick}
            onClueChange={onClueChange}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;