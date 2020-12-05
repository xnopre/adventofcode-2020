import { readLinesFromInputFile } from "../utils";

export function solvePart1(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const seatsNumbers = lines.map(convertToSeatId);
  return Math.max(...seatsNumbers);
}

export function solvePart2(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const seatsIds = lines.map(convertToSeatId);
  const minSeat = Math.min(...seatsIds);
  const maxSeat = Math.max(...seatsIds);
  const seats = new Array(maxSeat).fill(0);
  for (let i = 0; i < minSeat; i++) {
    seats[i] = 1;
  }
  for (const seat of seatsIds) {
    seats[seat] = 1;
  }
  const mySeat = seats.indexOf(0);
  return mySeat;
}

export function getPosition(code: string, min: number, max: number) {
  if (code.length === 0) return min;
  const letter = code.charAt(0);
  const dico = min + (max - min) / 2;
  if (letter === "F" || letter === "L") {
    return getPosition(code.substr(1), min, Math.floor(dico));
  }
  return getPosition(code.substr(1), Math.ceil(dico), max);
}

export function getRow(code: string, min = 0, max = 127) {
  return getPosition(code, min, max);
}

export function getCol(code: string, min = 0, max = 7) {
  return getPosition(code, min, max);
}

export function convertToSeatId(code: string): number {
  const row = getRow(code.substr(0, 7));
  const col = getCol(code.substr(7));
  return row * 8 + col;
}

if (require.main === module) {
  console.log("Day5 - Part 1 : answer is : " + solvePart1("day5/data/mydata"));
  console.log("Day5 - Part 2 : answer is : " + solvePart2("day5/data/mydata"));
}
