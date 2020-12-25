import { readLinesFromInputFile } from "../utils";

const SUBJECT_NUMBER = 7;

export function findLoopSize(n: number) {
  let value = 1;
  let loopSize = 0;
  const MAX = 200000000;
  while (value != n && loopSize < MAX) {
    value *= SUBJECT_NUMBER;
    value = value % 20201227;
    loopSize++;
  }
  return loopSize === MAX ? undefined : loopSize;
}

export function encrypt(subjectNumber: number, loopSize: number) {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = value * subjectNumber;
    value = value % 20201227;
  }
  return value;
}

export function solvePart1(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const cardPublicKey = parseInt(lines[0]);
  const doorPublicKey = parseInt(lines[1]);
  const doorLoopSize = findLoopSize(doorPublicKey);
  return encrypt(cardPublicKey, doorLoopSize);
}

export function solvePart2(filename: string): number {
  return 0;
}

if (require.main === module) {
  console.log(
    "Day25 - Part 1 : answer is : " + solvePart1("day25/data/mydata")
  );
  console.log(
    "Day25 - Part 2 : answer is : " + solvePart2("day25/data/mydata")
  );
}
