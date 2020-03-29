const ACROSS = "ACROSS";
const DOWN = "DOWN";

const isLocationMatchIndex = (i, size) => ({ location }) =>
  location.x === i % size && location.y === Math.floor(i / size);

export const getCellsFromClue = clue => {
  const { answer, direction, location, number, guess } = clue;
  const noOfCells = answer.length;
  const cells = [];

  for (let i = 0; i < noOfCells; i += 1) {
    cells.push({
      ...(guess && { letter: guess[i] }),
      ...(i === 0 && { number }),
      location: {
        x: direction === ACROSS ? location.x + i : location.x,
        y: direction === DOWN ? location.y + i : location.y
      }
    });
  }

  return cells;
};

export default ({ clues, size }) => {
  const grid = [];

  if (size.columns !== size.rows) {
    throw new Error("Puzzle isn't square");
  }

  const cells = Object.entries(clues)
    .map(([, value]) => getCellsFromClue(value))
    .reduce((arr, currentValue) => [...arr, ...currentValue], []);

  for (let i = 0; i < size.columns * size.rows; i += 1) {
    const tempCell = cells
      .filter(isLocationMatchIndex(i, size.columns))
      .reduce((arr, element) => {
        if (!arr) {
          return element;
        }

        return { ...arr, ...element };
      }, null);

    const { location, ...rest } = tempCell || {};

    grid.push({
      ...rest,
      filled: !!tempCell
    });
  }

  return grid;
};
