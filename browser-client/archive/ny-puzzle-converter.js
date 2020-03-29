

export default (data) => {
  const grid = [];
  const clues = [];
  const gridSize = data.size.cols;

  if (data.size.cols !== data.size.rows) {
    throw new Error("Puzzle isn't square");
  }

  grid.length = data.grid.length;

  data.grid.forEach((value, index) => {
    if (value === ".") {
      grid[index] = { filled: false };
      return;
    }

    const number = data.gridnums[index];
    grid[index] = {
      filled: true,
      number: number !== 0 ? number : undefined
    };
  });

  return { gridSize, grid, clues: data.clues };
};
