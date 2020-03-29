import data from "../puzzles/ny-times-2019-12-28.json";
import converter, { getCellsFromClue } from "./convert-to-grid.js";

describe("test the grid converter", () => {
  const grid = converter(data);

  test("first cell", () => {
    expect(grid[0]).toEqual({ filled: true, number: 1 });
  });

  test("second cell", () => {
    expect(grid[1]).toEqual({ filled: true });
  });

  test("third cell", () => {
    expect(grid[2]).toEqual({ filled: true });
  });

  test("sixth cell", () => {
    expect(grid[5]).toEqual({ filled: false });
  });

  test("has the correct length", () => {
    expect(grid.length).toEqual(16);
  });
});

describe("different grid", () => {
  const grid = converter({
    clues: {
      "clue-0001": {
        key: "0001",
        number: 7,
        description: "7. Where hands go in the Time Warp dance",
        location: { x: 5, y: 6 },
        direction: "ACROSS",
        answer: "HIPS",
        guess: ""
      }
    },

    size: {
      rows: 12,
      columns: 12
    }
  });

  test("first cell", () => {
    expect(grid[0]).toEqual({ filled: false });
  });

  test("78th cell", () => {
    expect(grid[77]).toEqual({ filled: true, number: 7 });
  });

  test("143rd cell", () => {
    expect(grid[143]).toEqual({ filled: false });
  });

  test("has the correct length", () => {
    expect(grid.length).toEqual(144);
  });
});

describe("not square grid", () => {
  const data = { clues: {}, size: { columns: 7, rows: 5 } };

  test("throws", () => {
    expect(() => converter(data)).toThrow("Puzzle isn't square");
  });
});

describe("getCellsFromClue", () => {
  describe("addCellData - ACROSS clue", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      location: { x: 0, y: 0 },
      direction: "ACROSS",
      answer: "HIPS"
    };

    const output = getCellsFromClue(clue);
    test("first cell offset", () => {
      expect(output[0]).toEqual({ location: { x: 0, y: 0 } });
    });
    test("second cell offset", () => {
      expect(output[1]).toEqual({ location: { x: 1, y: 0 } });
    });
    test("fourth cell offset", () => {
      expect(output[3]).toEqual({ location: { x: 3, y: 0 } });
    });
  });

  describe("addCellData - DOWN clue", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      location: { x: 0, y: 0 },
      direction: "DOWN",
      answer: "HIPSANDBUM"
    };

    const output = getCellsFromClue(clue);
    test("first cell offset", () => {
      expect(output[0]).toEqual({ location: { x: 0, y: 0 } });
    });
    test("second cell offset", () => {
      expect(output[1]).toEqual({ location: { x: 0, y: 1 } });
    });
    test("tenth cell offset", () => {
      expect(output[9]).toEqual({ location: { x: 0, y: 9 } });
    });
  });

  describe("addCellData - ACROSS, not origin", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      location: { x: 5, y: 7 },
      direction: "ACROSS",
      answer: "HIPS"
    };

    const output = getCellsFromClue(clue);
    test("first cell offset", () => {
      expect(output[0]).toEqual({ location: { x: 5, y: 7 } });
    });
    test("second cell offset", () => {
      expect(output[1]).toEqual({ location: { x: 6, y: 7 } });
    });
  });

  describe("addCellData - DOWN, not origin", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      location: { x: 5, y: 7 },
      direction: "DOWN",
      answer: "HIPS"
    };

    const output = getCellsFromClue(clue);
    test("first cell offset", () => {
      expect(output[0]).toEqual({ location: { x: 5, y: 7 } });
    });
    test("second cell offset", () => {
      expect(output[1]).toEqual({ location: { x: 5, y: 8 } });
    });
  });
});
