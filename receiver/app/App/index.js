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
      crossword: null,
      clue: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    const context = cast.framework.CastReceiverContext.getInstance();

    context.addCustomMessageListener(CHANNEL_CLUE, ({ data }) => {
      const { message } = data;
      this.setState({ clue: message });
    });

    context.addCustomMessageListener(CHANNEL_CROSSWORD, ({ data }) => {
      this.setState({ crossword: "hello" });
    });

    context.start();
  }

  render() {
    const { crossword, clue } = this.state;
    return (
      <div>
        <h1 style={{ color: "white", textAlign: "center" }}>CastCrossword</h1>
        {clue && (
          <h2 style={{ color: "white", textAlign: "center" }}>{clue}</h2>
        )}
      </div>
    );
    // <div
    //   style={{
    //     display: "flex",
    //     width: "100vw",
    //     height: "100vh"
    //   }}
    // >
    //   <Crossword grid={grid} gridSize={gridSize} />
    //   <Clues clues={clues} />
    // </div>
  }
}

export default App;
