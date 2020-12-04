import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day3/data/sample")).toEqual(7);
    expect(solvePart2("day3/data/sample")).toEqual(336);
  });
});
