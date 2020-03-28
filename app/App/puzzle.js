import { direction } from "./constants";

export default [
  {
    location: { x: 0, y: 0 },
    length: 5,
    direction: direction.ACROSS,
    clue: "some string",
    number: 1,
    guess: ["H", undefined, "L", "L"]
  },
  {
    location: { x: 4, y: 0 },
    length: 4,
    direction: direction.DOWN,
    clue: "some string",
    number: 2
  },
  {
    location: { x: 4, y: 1 },
    length: 6,
    direction: direction.ACROSS,
    clue: "some string",
    number: 4
  },
  {
    location: { x: 7, y: 4 },
    length: 7,
    direction: direction.DOWN,
    clue: "exceeds grid  size",
    number: 7,
    guess: ["H", undefined, "L", "L", 1, 2, 3, 4]
  },
  {
    location: { x: 1, y: 3 },
    length: 4,
    direction: direction.DOWN,
    clue: "exceeds grid  size",
    number: 11
  }
];
