import React, { useState } from "react";

import Clues from "./Clues";

// https://github.com/doshea/nyt_crosswords
import nyPuzzle from "./ny-puzzle-converter";

const { gridSize, grid, clues } = nyPuzzle();

const App = () => {
  const [message, setMessage] = useState("");

  const onClueClick = clue => () => {
    console.log(clue);
  };

  const buttonClick = () => {
    const CHANNEL_CROSSWORD = "urn:x-cast:crossword";
    const CHANNEL_CLUE = "urn:x-cast:clue";

    const context = cast.framework.CastContext.getInstance();
    const session = context.getCurrentSession();

    session
      .sendMessage(CHANNEL_CLUE, JSON.stringify({ message }))
      .then(() => {
        console.log("message sent");
      })
      .catch(err => {
        console.error("unable to send message", err);
      });
  };

  return (
    <div>
      {/* <h1>Hello World</h1>
      <input
        value={message}
        onChange={event => {
          const { target } = event;
          event.preventDefault();
          setMessage(target.value);
        }}
      /> */}
      {/* <button onClick={() => buttonClick()}>click me</button> */}
      <Clues clues={clues} onClueClick={onClueClick} />
    </div>
  );
};

export default App;
