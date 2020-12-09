import { readLinesFromInputFile } from "../utils";

function isSumOfTwoPreviousNumbers(
  numberToTest: number,
  numbers: number[],
  preamble: number
) {
  for (let i = 0; i < preamble; i++) {
    for (let j = i + 1; j < preamble; j++) {
      if (numbers[i] + numbers[j] == numberToTest) {
        return true;
      }
    }
  }
  return false;
}

function findBadNumber(numbers: number[], preamble: number): number {
  const nextNumber = numbers[preamble];
  if (!isSumOfTwoPreviousNumbers(nextNumber, numbers, preamble)) {
    return nextNumber;
  }
  return findBadNumber(numbers.slice(1), preamble);
}

export function solvePart1(filename: string, preamble: number): number {
  const numbers = readLinesFromInputFile(filename).map((s) => parseInt(s));
  return findBadNumber(numbers, preamble);
}

function findContiguousNumbers(
  numbers: number[],
  badNumber: number,
  start: number
): number {
  let sum = 0;
  let min = numbers[start];
  let max = numbers[start];
  for (let i = start; i < numbers.length; i++) {
    sum += numbers[i];
    min = Math.min(min, numbers[i]);
    max = Math.max(max, numbers[i]);
    if (sum === badNumber) {
      return min + max;
    }
    if (sum > badNumber) {
      return findContiguousNumbers(numbers, badNumber, start + 1);
    }
  }
  throw "Error reaching end of numbers without finding answer !";
}

export function solvePart2(filename: string, preamble: number): number {
  const numbers = readLinesFromInputFile(filename).map((s) => parseInt(s));
  const badNumber = findBadNumber(numbers, preamble);
  return findContiguousNumbers(numbers, badNumber, 0);
}

if (require.main === module) {
  console.log(
    "Day9 - Part 1 : answer is : " + solvePart1("day9/data/mydata", 25)
  );
  console.log(
    "Day9 - Part 2 : answer is : " + solvePart2("day9/data/mydata", 25)
  );
}
