import {
  top,
  bottom,
  reverse,
  solvePart1,
  solvePart2,
  Tile,
  left,
  right,
} from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day20/data/sample")).toEqual(20899048083289);
    // expect(solvePart2("day20/data/sample")).toEqual(0);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day20/data/mydata")).toEqual(7492183537913);
    // expect(solvePart2("day20/data/mydata")).toEqual(0);
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
    };
    expect(top(tile)).toEqual("#.#.#####.");
    expect(bottom(tile)).toEqual("..#.###...");
    expect(left(tile)).toEqual("#..##.#...");
    expect(right(tile)).toEqual(".#....#...");
  });
});
