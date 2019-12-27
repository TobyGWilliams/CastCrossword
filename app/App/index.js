/* eslint-disable react/prop-types */
import React from 'react';

const direction = {
  ACROSS: 'across',
  DOWN: 'down',
};

// make more dynamic
const gridSize = 12;

const puzzle = [
  {
    location: { x: 0, y: 0 },
    length: 5,
    direction: direction.ACROSS,
    clue: 'some string',
    number: 1,
    guess: ['H', undefined, 'L', 'L'],
  },
  {
    location: { x: 4, y: 0 },
    length: 4,
    direction: direction.DOWN,
    clue: 'some string',
    number: 2,
  },
  {
    location: { x: 4, y: 1 },
    length: 6,
    direction: direction.ACROSS,
    clue: 'some string',
    number: 4,
  },
  {
    location: { x: 7, y: 4 },
    length: 7,
    direction: direction.DOWN,
    clue: 'exceeds grid  size',
    number: 7,
    guess: ['H', undefined, 'L', 'L', 1, 2, 3, 4],
  },
  {
    location: { x: 1, y: 3 },
    length: 4,
    direction: direction.DOWN,
    clue: 'exceeds grid  size',
    number: 9,
  },
];

const grid = [];

for (let i = 0; i < gridSize; i += 1) {
  grid[i] = [];
}

const iterateColumns = (y, length, callback) => {
  for (let i = y; i <= y + length; i += 1) {
    callback(i);
  }
};

// iterate over the clues to populate the grid
puzzle.forEach(({ location, length, number, guess, ...clue }) => {
  if (clue.direction === direction.ACROSS) {
    // add in the blank spaces
    for (let i = location.x; i < length + location.x; i += 1) {
      grid[location.y][i] = {
        ...grid[location.y][i],
        filled: true,
        number: location.x === i ? number : undefined,
        letter: guess && guess[i - location.x],
      };
    }
  }

  if (clue.direction === direction.DOWN) {
    // the combination of location and length exceeds the grid size
    if (location.y + length >= gridSize) return;

    iterateColumns(location.y, length, y => {
      grid[y][location.x] = {
        ...grid[y][location.x],
        filled: true,
        number: y === location.y ? number : undefined,
      };
    });
  }
});

const getCells = () => {
  const output = [];
  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      output.push(<Cell {...grid[i][j]} />);
    }
  }
  return output;
};

const Cell = ({ filled, number, letter }) => {
  if (!filled) return <div />;

  return (
    <div
      style={{
        background: 'white',
        position: 'relative',
      }}
    >
      {number && (
        <div
          style={{
            margin: `calc(100vh/(${gridSize}*30))`,
            lineHeight: '1',
            fontSize: `calc(100vh/(${gridSize}*6))`,
            position: 'absolute',
          }}
        >
          {number}
        </div>
      )}
      {letter && (
        <div
          style={{
            textAlign: 'center',
            fontSize: `calc(100vh/(${gridSize}*1.4))`,
            lineHeight: '1.25',
          }}
        >
          {letter}
        </div>
      )}
    </div>
  );
};

const Crossword = () => (
  <div
    style={{
      background: 'black',
      padding: '5px',
      width: '100vh',
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridGap: '5px',
      gridAutoRows: '1fr',
    }}
  >
    {getCells()}

    {/* {clues.map(props => (
      <Cell {...props} />
    ))} */}
  </div>
);

const Hints = () => (
  <div
    style={{
      background: 'white',
      height: '100vh',
      flexGrow: 'width',
    }}
  >
    hints area
  </div>
);

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Crossword />
      <Hints />
    </div>
  );
}
