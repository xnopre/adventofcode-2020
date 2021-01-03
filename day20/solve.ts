import { readLinesFromInputFile } from "../utils";

type TileId = number;

export interface Tile {
  id: TileId;
  data: string[];
  rotated: number;
  adjacentsTop?: number;
  adjacentsBottom?: number;
  adjacentsLeft?: number;
  adjacentsRight?: number;
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

function countTilesCompatibles(
  tiles: Tile[],
  id: number,
  edge: string
): number {
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
  tile.adjacentsTop = countTilesCompatibles(tiles, tile.id, top(tile));
  tile.adjacentsBottom = countTilesCompatibles(tiles, tile.id, bottom(tile));
  tile.adjacentsLeft = countTilesCompatibles(tiles, tile.id, left(tile));
  tile.adjacentsRight = countTilesCompatibles(tiles, tile.id, right(tile));
  tile.adjacents =
    tile.adjacentsTop +
    tile.adjacentsBottom +
    tile.adjacentsLeft +
    tile.adjacentsRight;
}

export function readTiles(filename: string): Tile[] {
  const tiles: Tile[] = [];
  const lines = readLinesFromInputFile(filename, false);
  for (let i = 0; i < lines.length; ) {
    const id = parseInt(lines[i].substr("Tile ".length));
    const data = lines.slice(i + 1, i + 11);
    tiles.push({
      id,
      data,
      rotated: 0,
    });
    i += 12;
  }
  return tiles;
}

function countEdgesCompatiblesForAllTiles(tiles: Tile[]) {
  for (const tile of tiles) {
    countEdgesCompatibles(tiles, tile);
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

function initDoubleArray(edgeLen: number): Tile[][] {
  const result: Tile[][] = new Array(edgeLen);
  for (let i = 0; i < edgeLen; i++) {
    result[i] = new Array(edgeLen);
  }
  return result;
}

function extractOneCornerTile(tiles: Tile[]): Tile {
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (tile.adjacents === 2) {
      tiles.splice(i, 1);
      return tile;
    }
  }
}

function rotateTileData(data: string[]) {
  const rotatedData: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const line = data
      .map((s) => s[i])
      .reverse()
      .join("");
    rotatedData.push(line);
  }
  return rotatedData;
}

export function rotateTile(tile: Tile) {
  return {
    id: tile.id,
    data: rotateTileData(tile.data),
    adjacentsTop: tile.adjacentsLeft,
    adjacentsRight: tile.adjacentsTop,
    adjacentsBottom: tile.adjacentsRight,
    adjacentsLeft: tile.adjacentsBottom,
    adjacents: tile.adjacents,
    rotated: tile.rotated + 1,
  };
}

function adjustForFirstCorner(tile: Tile) {
  while (!(tile.adjacentsBottom === 1 && tile.adjacentsRight === 1)) {
    tile = rotateTile(tile);
  }
  return tile;
}

function extractCompatible(tiles: Tile[], edge: string) {
  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    if (
      top(tile) === edge ||
      reverse(top(tile)) === edge ||
      bottom(tile) === edge ||
      reverse(bottom(tile)) === edge ||
      left(tile) === edge ||
      reverse(left(tile)) === edge ||
      right(tile) === edge ||
      reverse(right(tile)) === edge
    ) {
      tiles.splice(i, 1);
      return tile;
    }
  }
}

function extractCompatibleAndAdjustTop(tiles: Tile[], tile: Tile): Tile {
  const edge = bottom(tile);
  let tile2 = extractCompatible(tiles, edge);
  for (let i = 0; top(tile2) !== edge && i < 3; i++) {
    tile2 = rotateTile(tile2);
  }
  if (top(tile2) !== edge) {
    tile2 = mirrorTile(tile2);
  }
  for (let i = 0; top(tile2) !== edge && i < 3; i++) {
    tile2 = rotateTile(tile2);
  }
  return tile2;
}

function mirrorTileData(data: string[]) {
  return data.reverse();
}

function mirrorTile(tile: Tile) {
  return {
    ...tile,
    data: mirrorTileData(tile.data),
  };
}

function extractCompatibleAndAdjustLeft(tiles: Tile[], tile: Tile): Tile {
  const edge = right(tile);
  let tile2 = extractCompatible(tiles, edge);
  for (let i = 0; left(tile2) !== edge && i < 3; i++) {
    tile2 = rotateTile(tile2);
  }
  if (left(tile2) !== edge) {
    tile2 = mirrorTile(tile2);
  }
  for (let i = 0; left(tile2) !== edge && i < 3; i++) {
    tile2 = rotateTile(tile2);
  }
  return tile2;
}

export function assembleTiles(tiles: Tile[]): Tile[][] {
  countEdgesCompatiblesForAllTiles(tiles);
  const edgeLen = Math.sqrt(tiles.length);
  const result = initDoubleArray(edgeLen);
  const oneCornerTile = extractOneCornerTile(tiles);
  for (let x = 0; x < edgeLen; x++) {
    for (let y = 0; y < edgeLen; y++) {
      if (x === 0 && y === 0) {
        result[x][y] = adjustForFirstCorner(oneCornerTile);
        continue;
      }
      if (y === 0) {
        result[x][y] = extractCompatibleAndAdjustTop(tiles, result[x - 1][0]);
      } else {
        result[x][y] = extractCompatibleAndAdjustLeft(tiles, result[x][y - 1]);
      }
    }
  }
  return result;
}

export function removeEdges(tileData: string[]) {
  return tileData
    .slice(1, tileData.length - 1)
    .map((line) => line.substr(1, line.length - 2));
}

export function mergeTiles(tiles: Tile[]): string[] {
  return assembleTiles(tiles).flatMap((tiles) => {
    return tiles
      .map((tile) => removeEdges(tile.data))
      .reduce((acc, tile) => {
        if (!acc) return tile;
        for (let i = 0; i < tile.length; i++) {
          acc[i] = acc[i] + tile[i];
        }
        return acc;
      }, undefined);
  });
}

function countMontersOnLine(tiles: string[], i: number) {
  const line1 = tiles[i - 1];
  const line2 = tiles[i];
  const line3 = tiles[i + 1];
  let monsterCount = 0;
  let x = line2.indexOf("###");
  while (x >= 0) {
    if (
      x >= 17 &&
      line1[x + 1] === "#" &&
      line2[x - 5] === "#" &&
      line2[x - 6] === "#" &&
      line2[x - 11] === "#" &&
      line2[x - 12] === "#" &&
      line2[x - 17] === "#" &&
      line3[x - 4] === "#" &&
      line3[x - 7] === "#" &&
      line3[x - 10] === "#" &&
      line3[x - 13] === "#" &&
      line3[x - 16] === "#"
    ) {
      monsterCount += 1;
    }
    x = line2.indexOf("###", x + 1);
  }
  return monsterCount;
}

export function countSharp(s: string[]) {
  return s.join("").replace(/\./g, "").length;
}

function countMonstersOnTile(tile: string[]) {
  let monsterCount = 0;
  for (let i = 1; i < tile.length - 1; i++) {
    monsterCount += countMontersOnLine(tile, i);
  }
  return monsterCount;
}

export function solvePart2(filename: string): number {
  const tiles = readTiles(filename);
  let merged = mergeTiles(tiles);
  let monsterCount = countMonstersOnTile(merged);
  for (let i = 0; monsterCount === 0 && i < 3; i++) {
    merged = rotateTileData(merged);
    monsterCount = countMonstersOnTile(merged);
  }
  if (monsterCount === 0) {
    merged = mirrorTileData(merged);
    monsterCount = countMonstersOnTile(merged);
    for (let i = 0; monsterCount === 0 && i < 3; i++) {
      merged = rotateTileData(merged);
      monsterCount = countMonstersOnTile(merged);
    }
  }
  console.log(`Final : monsterCount=${monsterCount}`);
  return countSharp(merged) - monsterCount * 15;
}

if (require.main === module) {
  console.log(
    "Day20 - Part 1 : answer is : " + solvePart1("day20/data/mydata")
  );
  console.log(
    "Day20 - Part 2 : answer is : " + solvePart2("day20/data/mydata")
  );
}
