import {
  top,
  bottom,
  reverse,
  solvePart1,
  solvePart2,
  Tile,
  left,
  right,
  assembleTiles,
  readTiles,
  rotateTile,
  removeEdges,
  mergeTiles,
  countSharp,
} from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day20/data/sample")).toEqual(20899048083289);
    expect(solvePart2("day20/data/sample")).toEqual(273);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day20/data/mydata")).toEqual(7492183537913);
    expect(solvePart2("day20/data/mydata")).toEqual(2323);
  });
});

describe("reverse", () => {
  it("should do the job", () => {
    expect(reverse("aze")).toEqual("eza");
  });
});

describe("top, bottom, left, right", () => {
  it("should do the job", () => {
    const tile: Tile = {
      id: 1,
      data: [
        "#.#.#####.",
        ".#..######",
        "..#.......",
        "######....",
        "####.#..#.",
        ".#...#.##.",
        "#.#####.##",
        "..#.###...",
        "..#.......",
        "..#.###...",
      ],
      rotated: 0,
    };
    expect(top(tile)).toEqual("#.#.#####.");
    expect(bottom(tile)).toEqual("..#.###...");
    expect(left(tile)).toEqual("#..##.#...");
    expect(right(tile)).toEqual(".#....#...");
  });
});

describe("assembleTiles", () => {
  it("should assemble all tiles", () => {
    const tiles = readTiles("day20/data/sample");
    // const expected = [
    //   [1951, 2311, 3079],
    //   [2729, 1427, 2473],
    //   [2971, 1489, 1171],
    // ];
    const expected = [
      [1951, 2729, 2971],
      [2311, 1427, 1489],
      [3079, 2473, 1171],
    ];
    const assembled = assembleTiles(tiles);
    const ids = assembled.map((arr) => arr.map((tile) => tile.id));
    expect(ids).toEqual(expected);
  });
});

describe("removeEdges", () => {
  it("should remove edges", () => {
    const tile = [
      "#.#.#####.",
      ".#..######",
      "..#.......",
      "######....",
      "####.#..#.",
      ".#...#.##.",
      "#.#####.##",
      "..#.###...",
      "..#.......",
      "..#.###...",
    ];
    const expected = [
      "#..#####",
      ".#......",
      "#####...",
      "###.#..#",
      "#...#.##",
      ".#####.#",
      ".#.###..",
      ".#......",
    ];
    expect(removeEdges(tile)).toEqual(expected);
  });
});

describe("mergeTiles", () => {
  it("should merge all tiles in one", () => {
    const tiles = readTiles("day20/data/sample");
    const expected = [
      ".#.#..#.##...#.##..#####",
      "###....#.#....#..#......",
      "##.##.###.#.#..######...",
      "###.#####...#.#####.#..#",
      "##.#....#.##.####...#.##",
      "...########.#....#####.#",
      "....#..#...##..#.#.###..",
      ".####...#..#.....#......",
      "#..#.##..#..###.#.##....",
      "#.####..#.####.#.#.###..",
      "###.#.#...#.######.#..##",
      "#.####....##..########.#",
      "##..##.#...#...#.#.#.#..",
      "...#..#..#.#.##..###.###",
      ".#.#....#.##.#...###.##.",
      "###.#...#..#.##.######..",
      ".#.#.###.##.##.#..#.##..",
      ".####.###.#...###.#..#.#",
      "..#.#..#..#.#.#.####.###",
      "#..####...#.#.#.###.###.",
      "#####..#####...###....##",
      "#.##..#..#...#..####...#",
      ".#.###..##..##..####.##.",
      "...###...##...#...#..###",
    ];

    expect(countSharp(mergeTiles(tiles))).toEqual(countSharp(expected));
  });
});

describe("rotateTile", () => {
  it("should rotate the tile data and adjust adjacents", () => {
    const tile: Tile = {
      id: 1,
      data: [
        "#.#.#####.",
        ".#..######",
        "..#.......",
        "######....",
        "####.#..#.",
        ".#...#.##.",
        "#.#####.##",
        "..#.###...",
        "..#.......",
        "..#.###...",
      ],
      rotated: 0,
      adjacentsLeft: 1,
      adjacentsTop: 2,
      adjacentsRight: 3,
      adjacentsBottom: 4,
      adjacents: 10,
    };
    const rotatedTile: Tile = {
      id: 1,
      data: [
        "...#.##..#",
        "....###.#.",
        "####.###.#",
        "...#.##...",
        "#.##..#.##",
        "#.#####.##",
        "#.##....##",
        "....#...##",
        "...###..##",
        "...#....#.",
      ],
      rotated: 1,
      adjacentsLeft: 4,
      adjacentsTop: 1,
      adjacentsRight: 2,
      adjacentsBottom: 3,
      adjacents: 10,
    };
    expect(rotateTile(tile)).toEqual(rotatedTile);
  });
});
