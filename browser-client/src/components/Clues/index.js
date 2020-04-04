import React, { Fragment } from "react";

import Clue from "./Clue";

const filterCluesByDirection = (clues, direction) =>
  Object.entries(clues)
    .filter(([, value]) => value.direction === direction)
    .map(([key, value]) => ({ ...value, key }));

const combineClues = (across, down) => {
  const longerArray = across.length > down.length ? across : down;

  return longerArray.reduce((outputArray, element, index) => {
    return [...outputArray, across[index], down[index]];
  }, []);
};

export default ({ clues, onClueClick, onClueChange }) => {
  const combinedClues = combineClues(
    filterCluesByDirection(clues, "ACROSS"),
    filterCluesByDirection(clues, "DOWN")
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 3fr 1fr 48px)",
        margin: "10px"
      }}
    >
      <h2 style={{ gridColumn: " 1 / span 3" }}>Across</h2>
      <h2 style={{ gridColumn: " 4 / span 3" }}>Down</h2>
      {combinedClues.map(clue => (
        <Fragment>
          {clue ? (
            <Clue
              clue={clue}
              onClick={onClueClick(clue)}
              onChange={onClueChange(clue)}
            />
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
  );
};
