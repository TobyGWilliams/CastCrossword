const fs = require("fs");

const convertClueToModel = (
  output,
  answers,
  gridnums,
  size,
  direction,
  directionConst
) => (clue, index) => {
  const number = Number(clue.match(/^([0-9]*?)\. /)[1]);
  const positionInGridNums = gridnums.findIndex(element => element === number);
  const location = {
    x: positionInGridNums % size,
    y: Math.floor(positionInGridNums / size)
  };
  output.clues.push({
    answer: answers[direction][index],
    description: clue,
    direction: directionConst,
    guess: "",
    number,
    location
  });
};

const convertGrid = ({ clues, answers, size, gridnums }) => {
  const output = { meta: {}, clues: [], size: { columns: 15, rows: 15 } };
  clues.across.forEach(
    convertClueToModel(output, answers, gridnums, size.rows, "across", "ACROSS")
  );
  clues.down.forEach(
    convertClueToModel(output, answers, gridnums, size.rows, "down", "DOWN")
  );
  return output;
};

const convertFile = (inputFile, outputFileLocation) => {
  const filename = "hello-world.json";
  const dataAsString = fs.readFileSync(inputFile, "utf8");
  const dataAsObject = JSON.parse(dataAsString);
  const outputData = convertGrid(dataAsObject);
  fs.writeFileSync(
    `/home/toby/Documents/development/CastCrossword/browser-client/app/puzzles/${filename}`,
    JSON.stringify(outputData)
  );
};

convertFile(
  "/home/toby/Documents/development/CastCrossword/browser-client/archive/data.json"
);
