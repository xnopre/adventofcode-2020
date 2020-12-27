import { readLinesFromInputFile } from "../utils";

export function convertToCupsArray(cups: string): number[] {
  return cups.split("").map((s) => parseInt(s));
}

export function move(cupsArray: number[], min = -1, max = -1): number[] {
  const currentCupValue = cupsArray.splice(0, 1)[0];
  const pickedCups = cupsArray.splice(0, 3);
  if (min === -1) min = Math.min(...cupsArray);
  if (max === -1) max = Math.max(...cupsArray);
  let dest = currentCupValue;
  let destIndex = -1;
  do {
    dest--;
    destIndex = cupsArray.indexOf(dest);
  } while (destIndex === -1 && dest > min);
  if (destIndex === -1) {
    destIndex = cupsArray.indexOf(max);
  }
  const newCupsArray = cupsArray
    .slice(0, destIndex + 1)
    .concat(pickedCups)
    .concat(cupsArray.slice(destIndex + 1))
    .concat([currentCupValue]);
  return newCupsArray;
}

export function doMoves(
  cups: number[],
  movesCount: number,
  min = -1,
  max = -1
) {
  for (let i = 0; i < movesCount; i++) {
    if (i % 100 === 0) {
      console.log(`move # ${(i * 100) / movesCount} %`);
    }
    cups = move(cups, min, max);
  }
  return cups;
}

export function labelsAfter1(cups: number[]) {
  const cupsStr = cups.map((n) => n.toString()).join("");
  const indexOf1 = cupsStr.indexOf("1");
  return cupsStr.substr(indexOf1 + 1) + cupsStr.substr(0, indexOf1);
}

export function solvePart1(filename: string): string {
  const cups = convertToCupsArray(readLinesFromInputFile(filename)[0]);
  const cupsAfter100Moves = doMoves(cups, 100);
  return labelsAfter1(cupsAfter100Moves);
}

export function solvePart2(filename: string): number {
  const cups = convertToCupsArray(readLinesFromInputFile(filename)[0]);
  const min = Math.min(...cups);
  const max = Math.max(...cups);
  for (let i = max + 1; i <= 1000000; i++) {
    cups.push(i);
  }
  const cupsAfter100Moves = doMoves(cups, 10000000, min, 1000000);
  const indexOf1 = cupsAfter100Moves.indexOf(1);
  const v1 = cupsAfter100Moves[indexOf1 + 1];
  console.log({ v1 });
  const v2 = cupsAfter100Moves[indexOf1 + 2];
  console.log({ v2 });
  return v1 * v2;
}

if (require.main === module) {
  console.log(
    "Day23 - Part 1 : answer is : " + solvePart1("day23/data/mydata")
  );
  console.log(
    "Day23 - Part 2 : answer is : " + solvePart2("day23/data/mydata")
  );
}
