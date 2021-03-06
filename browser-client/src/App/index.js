import React, { useState, Fragment, useEffect } from "react";
import { Button } from "@material-ui/core";
import AddToQueue from "@material-ui/icons/AddToQueue";

import Clues from "../components/Clues";
import Crossword from "../components/Crossword";
import Splash from "../components/Splash";

import htmlDecode from "../util/html-decode";
import convertToGrid from "../util/convert-to-grid";

import rawPuzzle1 from "../puzzles/toby.json";
import rawPuzzle2 from "../puzzles/ny-times-2019-12-28.json";

import { centerText, flexAlignCenter } from "../styles";

const CHANNEL_CROSSWORD = "urn:x-cast:crossword";
const CHANNEL_CLUE = "urn:x-cast:clue";

const puzzles = [rawPuzzle1, rawPuzzle2];

const App = ({ connectionStatus, googleCastButton, cast }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [puzzle, setPuzzle] = useState();
  const [selectedClue, setSelectedClue] = useState("");

  useEffect(() => {
    if (showSplash && puzzle && connectionStatus === "CONNECTED") {
      console.log("ready for puzzle");
      setTimeout(() => setShowSplash(false), 1000);
    }
  });

  const onPuzzleLoad = (puzzle) => {
    updatePuzzle(puzzle);
  };

  const onClueClick = (clue) => () => {
    // send to the chromecast
    try {
      sendClue(clue);
    } catch (err) {
      console.error("unable to send message");
    }
    // set the clue as selected in the UI
    setSelectedClue(clue);
    // update the puzzle so that the cells are highlighted

    const newClues = Object.entries(puzzle.clues).map(([key, value]) => [
      key,
      { ...value, selected: key === clue.key },
    ]);

    updatePuzzle({
      ...puzzle,
      clues: Object.fromEntries(newClues),
    });
  };

  const onClueChange = (clue) => (value) => {
    const newPuzzle = {
      ...puzzle,
      clues: {
        ...puzzle.clues,
        [clue.key]: { ...puzzle.clues[clue.key], guess: value },
      },
    };
    updatePuzzle(newPuzzle);
  };

  const updatePuzzle = (newPuzzle) => {
    const toBePuzzle = {
      ...newPuzzle,
      cells: convertToGrid(newPuzzle),
    };
    setPuzzle(toBePuzzle);
    sendPuzzle(toBePuzzle);
  };

  const sendPuzzle = (puzzle) => {
    sendMessage(CHANNEL_CROSSWORD, JSON.stringify({ puzzle }));
  };

  const sendClue = ({ direction, description, answer }) => {
    const clue = `${direction === "ACROSS" ? "Across" : "Down"}: ${htmlDecode(
      description
    )} (${answer.length})`;

    sendMessage(
      CHANNEL_CLUE,
      JSON.stringify({
        clue,
      })
    );
  };

  const sendMessage = (channel, message) => {
    const context = cast.framework.CastContext.getInstance();
    const session = context.getCurrentSession();
    session
      .sendMessage(channel, message)
      .then(() => {
        console.info("message sent", channel);
      })
      .catch((err) => {
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

  if (showSplash) {
    return (
      <Splash
        onSelectPuzzle={onPuzzleLoad}
        puzzles={puzzles}
        isPuzzle={!!puzzle}
        isConnection={!!connectionStatus}
        googleCastButton={googleCastButton}
      />
    );
  }

  return (
    <Fragment>
      <div
        style={{
          padding: "10px",
        }}
      >
        <h1 style={{ ...centerText, margin: 0 }}>CastCrossword</h1>
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
