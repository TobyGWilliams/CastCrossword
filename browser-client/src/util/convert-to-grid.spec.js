import data from "../puzzles/ny-times-2019-12-28.json";
import converter, { getCellsFromClue } from "./convert-to-grid.js";

describe("test the grid converter", () => {
  const grid = converter(data);

  test("first cell", () => {
    expect(grid[0]).toEqual({ filled: true, number: 5 });
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
    expect(grid.length).toEqual(256);
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
        guess: "LIPS"
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
    expect(grid[77]).toEqual({letter:'L', filled: true, number: 7 });
  });

  test("143rd cell", () => {
    expect(grid[143]).toEqual({ filled: false });
  });

  test("has the correct length", () => {
    expect(grid.length).toEqual(144);
  });
});

describe("grid with two clues at the same starting point", () => {
  const grid = converter({
    clues: {
      "clue-0003": {
        number: 3,
        description: "7. Where hands go in the Time Warp dance",
        location: { x: 1, y: 3 },
        direction: "ACROSS",
        answer: "ASD",
        guess: ""
      },
      "clue-0001": {
        number: 7,
        description: "7. Where hands go in the Time Warp dance",
        location: { x: 1, y: 1 },
        direction: "ACROSS",
        answer: "ABC",
        guess: ""
      },
      "clue-0002": {
        number: 9,
        description: "7. Where hands go in the Time Warp dance",
        location: { x: 1, y: 1 },
        direction: "DOWN",
        answer: "ASD",
        guess: ""
      },

      "clue-0004": {
        number: 5,
        description: "7. Where hands go in the Time Warp dance",
        location: { x: 3, y: 0 },
        direction: "DOWN",
        answer: "ASD",
        guess: ""
      }
    },
    size: {
      rows: 4,
      columns: 4
    }
  });

  test("first cell", () => {
    expect(grid[0]).toEqual({ filled: false });
  });

  test("forth cell", () => {
    expect(grid[3]).toEqual({ filled: true, number: 5 });
  });

  test("6th cell", () => {
    expect(grid[5]).toEqual({ filled: true, number: 9 });
  });

  test("has the correct length", () => {
    expect(grid.length).toEqual(16);
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

  describe("addCellData - DOWN, with guess", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      number: 1,
      location: { x: 5, y: 7 },
      direction: "DOWN",
      answer: "HIPS",
      guess: "LIPS"
    };

    const output = getCellsFromClue(clue);

    test("first cell offset", () => {
      expect(output[0]).toEqual({
        letter: "L",
        number: 1,
        location: { x: 5, y: 7 }
      });
    });

    test("second cell offset", () => {
      expect(output[1]).toEqual({ letter: "I", location: { x: 5, y: 8 } });
    });
    test("third cell offset", () => {
      expect(output[2]).toEqual({ letter: "P", location: { x: 5, y: 9 } });
    });
    test("forth cell offset", () => {
      expect(output[3]).toEqual({ letter: "S", location: { x: 5, y: 10 } });
    });
  });

  describe("addCellData - DOWN, with incomplete guess", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      number: 1,
      location: { x: 5, y: 7 },
      direction: "DOWN",
      answer: "HIPS",
      guess: "LI"
    };

    const output = getCellsFromClue(clue);

    test("first cell offset", () => {
      expect(output[0]).toEqual({
        letter: "L",
        number: 1,
        location: { x: 5, y: 7 }
      });
    });

    test("second cell offset", () => {
      expect(output[1]).toEqual({ letter: "I", location: { x: 5, y: 8 } });
    });

    test("third cell offset", () => {
      expect(output[2]).toEqual({ location: { x: 5, y: 9 } });
    });

    test("forth cell offset", () => {
      expect(output[3]).toEqual({ location: { x: 5, y: 10 } });
    });
  });

  describe("addCellData - DOWN, with incomplete guess", () => {
    const clue = {
      key: "0001",
      description: "1. Where hands go in the Time Warp dance",
      number: 1,
      location: { x: 5, y: 7 },
      direction: "DOWN",
      answer: "HIPS",
      guess: "SHOLDERS"
    };

    const output = getCellsFromClue(clue);

    test("first cell offset", () => {
      expect(output[0]).toEqual({
        letter: "S",
        number: 1,
        location: { x: 5, y: 7 }
      });
    });

    test("second cell offset", () => {
      expect(output[1]).toEqual({ letter: "H", location: { x: 5, y: 8 } });
    });

    test("third cell offset", () => {
      expect(output[2]).toEqual({ letter: "O", location: { x: 5, y: 9 } });
    });

    test("forth cell offset", () => {
      expect(output[3]).toEqual({ letter: "L", location: { x: 5, y: 10 } });
    });
  });
});
