import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day2/data/sample")).toEqual(2);
    expect(solvePart2("day2/data/sample")).toEqual(1);
  });
});
