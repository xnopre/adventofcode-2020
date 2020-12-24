import { getXY, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day24/data/sample")).toEqual(10);
    expect(solvePart2("day24/data/sample")).toEqual(2208);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day24/data/mydata")).toEqual(360);
    expect(solvePart2("day24/data/mydata")).toEqual(3924);
  });
});

describe("getXY", () => {
  it("should return X,Y position of tile from directions", () => {
    expect(getXY("nwwswee")).toEqual({ x: 0, y: 0 });
    expect(getXY("esew")).toEqual({ x: 1, y: -1 });
  });
});
