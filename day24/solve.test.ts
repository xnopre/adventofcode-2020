import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day24/data/sample")).toEqual(0);
    expect(solvePart2("day24/data/sample")).toEqual(0);
  });

  it.skip("solves the problem with my sample", () => {
    expect(solvePart1("day24/data/mydata")).toEqual(0);
    expect(solvePart2("day24/data/mydata")).toEqual(0);
  });
});
