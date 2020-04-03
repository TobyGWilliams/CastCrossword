import React from "react";

import Crossword from "./Crossword";
import Clues from "./Clues";

// https://github.com/doshea/nyt_crosswords
// import nyPuzzle from "./ny-puzzle-converter";

// const { gridSize, grid, clues } = nyPuzzle();

const CHANNEL_CROSSWORD = "urn:x-cast:crossword";
const CHANNEL_CLUE = "urn:x-cast:clue";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: null,
      clue: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    const context = cast.framework.CastReceiverContext.getInstance();

    context.addCustomMessageListener(CHANNEL_CLUE, ({ data }) => {
      console.log(JSON.stringify(data));
      const { clue } = data;
      this.setState({ clue });
    });

    context.addCustomMessageListener(CHANNEL_CROSSWORD, ({ data }) => {
      console.log(JSON.stringify(data));
      const { puzzle } = data;
      this.setState({ puzzle });
    });

    context.start();
  }

  render() {
    const { puzzle, clue } = this.state;
    return (
      <div>
        <h1 style={{ color: "white", textAlign: "center" }}>CastCrossword</h1>
        {clue && (
          <h2 style={{ color: "white", textAlign: "center" }}>{clue}</h2>
        )}
        {puzzle && (
         <Crossword grid={puzzle.cells} gridSize={puzzle.size.columns} />
        )}
      </div>
    );
  }
}

export default App;
