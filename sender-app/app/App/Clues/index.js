import React, { Fragment } from "react";

import Clue from "./Clue";

const combineClues = (across, down) => {
  const longerArray = across.length > down.length ? across : down;

  return longerArray.reduce((outputArray, element, index) => {
    return [...outputArray, across[index], down[index]];
  }, []);
};

export default ({ clues, onClueClick }) => {
  return (
    <div
      style={{
        padding: "5px"
      }}
    >
      <h1>Clues</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 3fr 1fr 48px)",
        }}
      >
        <h2 style={{ gridColumn: " 1 / span 3" }}>Across</h2>
        <h2 style={{ gridColumn: " 4 / span 3" }}>Down</h2>
        {combineClues(clues.across, clues.down).map(clue => (
          <Fragment>
            {clue ? (
              <Clue clue={clue} onClick={onClueClick(clue)} />
            ) : (
              <Fragment>
                <div />
                <div />
                <div />
              </Fragment>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
