import { direction } from "./constants";

const iterateColumns = (y, length, callback) => {
  for (let i = y; i <= y + length; i += 1) {
    callback(i);
  }
};

export default (puzzle, gridSize) => {
  const grid = [];

  for (let i = 0; i < gridSize; i += 1) {
    grid[i] = [];
  }

  // iterate over the clues to populate the grid
  puzzle.forEach(({ location, length, number, guess, ...clue }) => {
    if (clue.direction === direction.ACROSS) {
      // add in the blank spaces
      for (let i = location.x; i < length + location.x; i += 1) {
        grid[location.y][i] = {
          ...grid[location.y][i],
          filled: true,
          number: location.x === i ? number : undefined,
          letter: guess && guess[i - location.x]
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
          number: y === location.y ? number : undefined
        };
      });
    }
  });
  return grid;
};
