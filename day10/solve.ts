import { readLinesFromInputFile } from "../utils";

function readJolts(filename: string) {
  const jolts = readLinesFromInputFile(filename)
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);
  return jolts;
}

export function countJoltsDifferences(filename: string) {
  const jolts = readJolts(filename);
  let currentJolt = 0;
  const result = {};
  for (const jolt of jolts) {
    const diff = jolt - currentJolt;
    result[diff] = result[diff] !== undefined ? result[diff] + 1 : 1;
    currentJolt = jolt;
  }
  result[3]++;
  return result;
}

export function solvePart1(filename: string): number {
  const diffs = countJoltsDifferences(filename);
  return diffs[1] * diffs[3];
}

export function solvePart2(filename: string): number {
  const jolts = [0, ...readJolts(filename)].reverse();
  const solutions = jolts.reduce((acc, jolt, index) => {
    acc[index] = 1;
    if (index >= 1) {
      acc[index] = acc[index - 1];
    }
    if (index >= 2 && jolts[index - 2] - jolts[index] <= 3) {
      acc[index] += acc[index - 2];
    }
    if (index >= 3 && jolts[index - 3] - jolts[index] <= 3) {
      acc[index] += acc[index - 3];
    }
    return acc;
  }, {});
  return solutions[jolts.length - 1];
}

if (require.main === module) {
  console.log(
    "Day10 - Part 1 : answer is : " + solvePart1("day10/data/mydata")
  );
  console.log(
    "Day10 - Part 2 : answer is : " + solvePart2("day10/data/mydata")
  );
}
