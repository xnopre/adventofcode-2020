import { readLinesFromInputFile } from "../utils";

export interface Tile {
  id: number;
  data: string[];
  adjacents?: number;
}

export function top(tile: Tile) {
  return tile.data[0];
}

export function bottom(tile: Tile) {
  return tile.data[tile.data.length - 1];
}

export function left(tile: Tile) {
  return tile.data.map((line) => line[0]).join("");
}

export function right(tile: Tile) {
  return tile.data.map((line) => line[line.length - 1]).join("");
}

export function reverse(s: string) {
  return s.split("").reverse().join("");
}

function countTilesCompatibles(tiles: Tile[], id: number, edge: string) {
  let count = 0;
  for (const tile of tiles) {
    if (tile.id === id) continue;
    if (top(tile) === edge) count++;
    if (reverse(top(tile)) === edge) count++;
    if (bottom(tile) === edge) count++;
    if (reverse(bottom(tile)) === edge) count++;
    if (left(tile) === edge) count++;
    if (reverse(left(tile)) === edge) count++;
    if (right(tile) === edge) count++;
    if (reverse(right(tile)) === edge) count++;
  }
  return count;
}

function countEdgesCompatibles(tiles: Tile[], tile: Tile) {
  return (
    countTilesCompatibles(tiles, tile.id, top(tile)) +
    countTilesCompatibles(tiles, tile.id, bottom(tile)) +
    countTilesCompatibles(tiles, tile.id, left(tile)) +
    countTilesCompatibles(tiles, tile.id, right(tile))
  );
}

function readTiles(filename: string): Tile[] {
  const tiles: Tile[] = [];
  const lines = readLinesFromInputFile(filename, false);
  for (let i = 0; i < lines.length; ) {
    const id = parseInt(lines[i].substr("Tile ".length));
    const data = lines.slice(i + 1, i + 11);
    tiles.push({
      id,
      data,
    });
    i += 12;
  }
  return tiles;
}

function countEdgesCompatiblesForAllTiles(tiles: Tile[]) {
  for (const tile of tiles) {
    tile.adjacents = countEdgesCompatibles(tiles, tile);
  }
}

export function solvePart1(filename: string): number {
  const tiles = readTiles(filename);
  console.log(`${tiles.length} tiles read !`);
  countEdgesCompatiblesForAllTiles(tiles);
  return tiles
    .filter((tile) => tile.adjacents === 2)
    .reduce((acc, tile) => acc * tile.id, 1);
}

export function solvePart2(filename: string): number {
  return 0;
}

if (require.main === module) {
  console.log(
    "Day20 - Part 1 : answer is : " + solvePart1("day20/data/mydata")
  );
  console.log(
    "Day20 - Part 2 : answer is : " + solvePart2("day20/data/mydata")
  );
}
