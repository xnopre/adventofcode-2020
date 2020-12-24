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

function countBlackTiles(tiles: { [p: string]: boolean }) {
  let count = 0;
  for (const key in tiles) {
    if (tiles[key]) {
      count++;
    }
  }
  return count;
}

type TilesMapBlack = { [key: string]: boolean };

function getKey(x: number, y: number) {
  return `${x};${y}`;
}

function fromKey(key: string) {
  const parts = key.split(";");
  const x = parseInt(parts[0]);
  const y = parseInt(parts[1]);
  return { x, y };
}

function flipTilesApplyingDirections(directions: string[]): TilesMapBlack {
  return directions.reduce((map, line) => {
    const pos = getXY(line);
    const key = getKey(pos.x, pos.y);
    if (map[key] === undefined) {
      map[key] = false;
    }
    map[key] = !map[key];
    return map;
  }, {});
}

export function solvePart1(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const tiles = flipTilesApplyingDirections(lines);
  return countBlackTiles(tiles);
}

function getCountAdjacentBlack(tiles: TilesMapBlack, x: number, y: number) {
  return (
    (tiles[getKey(x + 2, y)] ? 1 : 0) +
    (tiles[getKey(x + 1, y + 1)] ? 1 : 0) +
    (tiles[getKey(x + 1, y - 1)] ? 1 : 0) +
    (tiles[getKey(x - 2, y)] ? 1 : 0) +
    (tiles[getKey(x - 1, y + 1)] ? 1 : 0) +
    (tiles[getKey(x - 1, y - 1)] ? 1 : 0)
  );
}

function getMinAndMaxXY(tiles: TilesMapBlack) {
  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0;
  for (const key in tiles) {
    const { x, y } = fromKey(key);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  minX--;
  maxX++;
  minY--;
  maxY++;
  return { minX, maxX, minY, maxY };
}

function switchTiles(tiles: TilesMapBlack): TilesMapBlack {
  const newTiles: TilesMapBlack = {};
  const { minX, maxX, minY, maxY } = getMinAndMaxXY(tiles);
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if ((x + y) % 2 !== 0) continue;
      const countAdjacentBlack = getCountAdjacentBlack(tiles, x, y);
      const key = getKey(x, y);
      newTiles[key] = tiles[key] || false;
      if (newTiles[key]) {
        if (countAdjacentBlack === 0 || countAdjacentBlack > 2) {
          newTiles[key] = false;
        }
      } else {
        if (countAdjacentBlack === 2) {
          newTiles[key] = true;
        }
      }
    }
  }
  return newTiles;
}

export function solvePart2(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  let tiles = flipTilesApplyingDirections(lines);
  for (let i = 0; i < 100; i++) {
    tiles = switchTiles(tiles);
  }
  return countBlackTiles(tiles);
}

if (require.main === module) {
  console.log(
    "Day24 - Part 1 : answer is : " + solvePart1("day24/data/mydata")
  );
  console.log(
    "Day24 - Part 2 : answer is : " + solvePart2("day24/data/mydata")
  );
}
