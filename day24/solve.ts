import { readLinesFromInputFile } from "../utils";

export function getXY(directions: string) {
  let x = 0;
  let y = 0;
  let [, direction, rest] = directions.match(/^(ne|se|e|nw|sw|w)(.*)$/);
  while (true) {
    switch (direction) {
      case "e":
        x += 2;
        break;
      case "ne":
        x += 1;
        y += 1;
        break;
      case "se":
        x += 1;
        y -= 1;
        break;
      case "w":
        x -= 2;
        break;
      case "nw":
        x -= 1;
        y += 1;
        break;
      case "sw":
        x -= 1;
        y -= 1;
        break;
    }
    // console.log(`${direction} --> ${x},${y}`);
    if (rest.trim().length === 0) break;
    [, direction, rest] = rest.match(/^(ne|se|e|nw|sw|w)(.*)$/);
  }
  return { x, y };
}

export function solvePart1(filename: string): number {
  const tiles: { [key: string]: boolean } = {};
  const lines = readLinesFromInputFile(filename);
  lines.forEach((line) => {
    const pos = getXY(line);
    const key = `${pos.x}-${pos.y}`;
    if (tiles[key] === undefined) {
      tiles[key] = false;
    }
    tiles[key] = !tiles[key];
  });
  let count = 0;
  for (const key in tiles) {
    if (tiles[key]) {
      count++;
    }
  }
  return count;
}

export function solvePart2(filename: string): number {
  return 0;
}

if (require.main === module) {
  getXY("nwwswee");
  console.log(
    "Day24 - Part 1 : answer is : " + solvePart1("day24/data/mydata")
  );
  console.log(
    "Day24 - Part 2 : answer is : " + solvePart2("day24/data/mydata")
  );
}
