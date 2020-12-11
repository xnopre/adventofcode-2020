import { clone, readLinesFromInputFile } from "../utils";

export function nextStep(seats: string[][]) {
  function isFloor(i: number, j: number) {
    return seats[i][j] === ".";
  }

  function isEmpty(i: number, j: number) {
    return seats[i][j] === "L";
  }

  function isOccupied(i: number, j: number) {
    if (i < 0 || i >= seats.length || j < 0 || j >= seats[i].length) {
      return false;
    }
    return seats[i][j] === "#";
  }

  function countOccupiedForOneSeat(i: number, j: number) {
    return isOccupied(i, j) ? 1 : 0;
  }

  function countOccupiedNear(i: number, j: number) {
    return (
      countOccupiedForOneSeat(i - 1, j - 1) +
      countOccupiedForOneSeat(i - 1, j) +
      countOccupiedForOneSeat(i - 1, j + 1) +
      countOccupiedForOneSeat(i, j - 1) +
      countOccupiedForOneSeat(i, j + 1) +
      countOccupiedForOneSeat(i + 1, j - 1) +
      countOccupiedForOneSeat(i + 1, j) +
      countOccupiedForOneSeat(i + 1, j + 1)
    );
  }

  function canBeOccupied(i: number, j: number) {
    return countOccupiedNear(i, j) === 0;
  }

  function canBeFree(i: number, j: number) {
    return countOccupiedNear(i, j) >= 4;
  }

  const newSeats = clone(seats);
  let moved = false;
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (isFloor(i, j)) {
        continue;
      }
      if (isEmpty(i, j) && canBeOccupied(i, j)) {
        newSeats[i][j] = "#";
        moved = true;
      } else if (isOccupied(i, j) && canBeFree(i, j)) {
        newSeats[i][j] = "L";
        moved = true;
      }
    }
  }
  return { newSeats, moved };
}

export function nextStepPart2(seats: string[][]) {
  function isFloor(i: number, j: number) {
    return seats[i][j] === ".";
  }

  function isEmpty(i: number, j: number) {
    if (i < 0 || i >= seats.length || j < 0 || j >= seats[i].length) {
      return true;
    }
    return seats[i][j] === "L";
  }

  function isOccupied(i: number, j: number) {
    if (i < 0 || i >= seats.length || j < 0 || j >= seats[i].length) {
      return false;
    }
    return seats[i][j] === "#";
  }

  function countOccupiedForOneSeat(
    i: number,
    j: number,
    di: number,
    dj: number
  ) {
    if (isOccupied(i + di, j + dj)) {
      return 1;
    }
    if (isEmpty(i + di, j + dj)) {
      return 0;
    }
    return countOccupiedForOneSeat(i + di, j + dj, di, dj);
  }

  function countOccupiedNear(i: number, j: number) {
    return (
      countOccupiedForOneSeat(i, j, -1, -1) +
      countOccupiedForOneSeat(i, j, -1, 0) +
      countOccupiedForOneSeat(i, j, -1, 1) +
      countOccupiedForOneSeat(i, j, 0, -1) +
      countOccupiedForOneSeat(i, j, 0, 1) +
      countOccupiedForOneSeat(i, j, 1, -1) +
      countOccupiedForOneSeat(i, j, 1, 0) +
      countOccupiedForOneSeat(i, j, 1, 1)
    );
  }

  function canBeOccupied(i: number, j: number) {
    return countOccupiedNear(i, j) === 0;
  }

  function canBeFree(i: number, j: number) {
    return countOccupiedNear(i, j) >= 5;
  }

  const newSeats = clone(seats);
  let moved = false;
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (isFloor(i, j)) {
        continue;
      }
      if (isEmpty(i, j) && canBeOccupied(i, j)) {
        newSeats[i][j] = "#";
        moved = true;
      } else if (isOccupied(i, j) && canBeFree(i, j)) {
        newSeats[i][j] = "L";
        moved = true;
      }
    }
  }
  return { newSeats, moved };
}

function countOccupied(seats: string[][]) {
  return seats
    .map((lines) => lines.join(""))
    .join("")
    .split("")
    .filter((letter) => letter === "#")
    .join("").length;
}

export function readSeats(filename: string) {
  return readLinesFromInputFile(filename)
    .filter((line) => line.length > 0)
    .map((line) => line.split(""));
}

export function solvePart1(filename: string): number {
  let seats = readSeats(filename);
  let hasMoved = true;
  do {
    const { newSeats, moved } = nextStep(seats);
    hasMoved = moved;
    seats = newSeats;
  } while (hasMoved);
  return countOccupied(seats);
}

export function solvePart2(filename: string): number {
  let seats = readSeats(filename);
  let hasMoved = true;
  do {
    const { newSeats, moved } = nextStepPart2(seats);
    hasMoved = moved;
    seats = newSeats;
  } while (hasMoved);
  return countOccupied(seats);
}

if (require.main === module) {
  console.log(
    "Day11 - Part 1 : answer is : " + solvePart1("day11/data/mydata")
  );
  console.log(
    "Day11 - Part 2 : answer is : " + solvePart2("day11/data/mydata")
  );
}
