import { readLinesFromInputFile } from "../utils";

export type Line = ("." | "#")[];
export type Layer = Line[];
export type Cube = Layer[];
export type HyperCube = Cube[];

function initLine(count: number): Line {
  return new Array(count).fill(".");
}

function initLayer(count: number): Layer {
  const line = initLine(count);
  const newLayer = new Array(count);
  for (let i = 0; i < count; i++) {
    newLayer[i] = [...line];
  }
  return newLayer;
}

function initCube(count: number): Cube {
  const cube = new Array(count);
  for (let i = 0; i < count; i++) {
    cube[i] = initLayer(count);
  }
  return cube;
}

function initHyperCube(count: number): HyperCube {
  const hypercube = new Array(count);
  for (let i = 0; i < count; i++) {
    hypercube[i] = initCube(count);
  }
  return hypercube;
}

function enlargeLine(line: Line): Line {
  return [".", ...line, "."];
}

function enlargeLayer(layer: Layer): Layer {
  const lines = layer.map((line) => enlargeLine(line));
  const newLineL = initLine(lines[0].length);
  const newLineR = initLine(lines[0].length);
  return [newLineL, ...lines, newLineR];
}

function enlargeCube(cube: Cube): Cube {
  const layers = cube.map((layer) => enlargeLayer(layer));
  const count = layers[0][0].length;
  const newLayerL = initLayer(count);
  const newLayerR = initLayer(count);
  return [newLayerL, ...layers, newLayerR];
}

function enlargeHyperCube(hypercube: HyperCube): HyperCube {
  const cubes = hypercube.map((cube) => enlargeCube(cube));
  const count = cubes[0][0][0].length;
  const newCubeL = initCube(count);
  const newCubeR = initCube(count);
  return [newCubeL, ...cubes, newCubeR];
}

function isActiveOnLayer(layer: Layer, y: number, z: number): 0 | 1 {
  if (!layer) return 0; // TODO Garde-fou mais pourquoi parfois layer=undefined ?
  if (y < 0 || z < 0) return 0;
  if (y >= layer.length) return 0;
  if (z >= layer[y].length) return 0;
  return layer[y][z] === "#" ? 1 : 0;
}

function countNeighboursActiveLayer(
  layer: Layer,
  y: number,
  z: number,
  ignore = false
) {
  return (
    // z-1
    isActiveOnLayer(layer, y - 1, z - 1) +
    isActiveOnLayer(layer, y, z - 1) +
    isActiveOnLayer(layer, y + 1, z - 1) +
    // z
    isActiveOnLayer(layer, y - 1, z) +
    (ignore ? 0 : isActiveOnLayer(layer, y, z)) +
    isActiveOnLayer(layer, y + 1, z) +
    // z+1
    isActiveOnLayer(layer, y - 1, z + 1) +
    isActiveOnLayer(layer, y, z + 1) +
    isActiveOnLayer(layer, y + 1, z + 1)
  );
}

function countNeighboursActive(
  cube: Cube,
  x: number,
  y: number,
  z: number,
  ignore = false
): number {
  let count = countNeighboursActiveLayer(cube[x], y, z, ignore);
  if (x > 0) {
    count += countNeighboursActiveLayer(cube[x - 1], y, z);
  }
  if (x < cube.length - 1) {
    count += countNeighboursActiveLayer(cube[x + 1], y, z);
  }
  return count;
}

function countNeighboursActiveH(
  cube: HyperCube,
  h: number,
  x: number,
  y: number,
  z: number
) {
  let count = countNeighboursActive(cube[h], x, y, z, true);
  if (h > 0) {
    count += countNeighboursActive(cube[h - 1], x, y, z);
  }
  if (h < cube.length - 1) {
    count += countNeighboursActive(cube[h + 1], x, y, z);
  }
  return count;
}

function convertFlatToCube(cubes: Cube): Cube {
  const dim = cubes[0][0].length;
  return [initLayer(dim), cubes[0], initLayer(dim)];
}

function convertFlatToCubeH(cube: HyperCube): HyperCube {
  const dim = cube[0][0][0].length;
  return [
    [initLayer(dim), initLayer(dim), initLayer(dim)],
    [initLayer(dim), cube[0][0], initLayer(dim)],
    [initLayer(dim), initLayer(dim), initLayer(dim)],
  ];
}

export function printCube(cube: Cube, msg = "") {
  console.log(msg);
  console.log(
    cube
      .map((layer) => {
        return layer.map((line) => line.join("")).join("\n");
      })
      .join("\n---\n")
  );
}

export function runOneCycle(cube: Cube): Cube {
  if (cube.length === 1) {
    cube = convertFlatToCube(cube);
  }
  cube = enlargeCube(cube);
  const result = initCube(cube[0][0].length);
  for (let x = 0; x < cube.length; x++) {
    for (let y = 0; y < cube[x].length; y++) {
      for (let z = 0; z < cube[x][y].length; z++) {
        const neighboursActive = countNeighboursActive(cube, x, y, z, true);
        if (cube[x][y][z] === "#") {
          if (neighboursActive === 2 || neighboursActive === 3) {
            result[x][y][z] = "#";
          }
        } else {
          if (neighboursActive === 3) {
            result[x][y][z] = "#";
          }
        }
      }
    }
  }
  return result;
}

export function runOneCycleH(hypercube: HyperCube): HyperCube {
  if (hypercube.length === 1) {
    hypercube = convertFlatToCubeH(hypercube);
  }
  hypercube = enlargeHyperCube(hypercube);
  const result = initHyperCube(hypercube[0][0][0].length);
  for (let h = 0; h < hypercube.length; h++) {
    for (let x = 0; x < hypercube[h].length; x++) {
      for (let y = 0; y < hypercube[h][x].length; y++) {
        for (let z = 0; z < hypercube[h][x][y].length; z++) {
          const neighboursActive = countNeighboursActiveH(
            hypercube,
            h,
            x,
            y,
            z
          );
          if (hypercube[h][x][y][z] === "#") {
            if (neighboursActive === 2 || neighboursActive === 3) {
              result[h][x][y][z] = "#";
            }
          } else {
            if (neighboursActive === 3) {
              result[h][x][y][z] = "#";
            }
          }
        }
      }
    }
  }
  return result;
}

function countActive(cube: Cube) {
  return cube.reduce(
    (acc, layer) =>
      acc +
      layer.reduce(
        (acc, line) =>
          acc +
          line.reduce((acc, letter) => (letter === "#" ? acc + 1 : acc), 0),
        0
      ),
    0
  );
}

function countActiveH(hypercube: HyperCube) {
  return hypercube.reduce((acc, cube) => acc + countActive(cube), 0);
}

function readLayer(filename: string) {
  return readLinesFromInputFile(filename).map((s) => {
    return s.split("") as Line;
  });
}

export function solvePart1(filename: string): number {
  const layer = readLayer(filename);
  let cube: Cube = [layer];
  for (let i = 0; i < 6; i++) {
    cube = runOneCycle(cube);
  }
  return countActive(cube);
}

export function solvePart2(filename: string): number {
  const layer = readLayer(filename);
  let cube: HyperCube = [[layer]];
  for (let i = 0; i < 6; i++) {
    cube = runOneCycleH(cube);
  }
  return countActiveH(cube);
}

if (require.main === module) {
  console.log(
    "Day17 - Part 1 : answer is : " + solvePart1("day17/data/mydata")
  );
  console.log(
    "Day17 - Part 2 : answer is : " + solvePart2("day17/data/mydata")
  );
}
