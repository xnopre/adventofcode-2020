import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day8/data/sample")).toEqual(5);
    expect(solvePart2("day8/data/sample")).toEqual(8);

    // With my real data and my solution
    expect(solvePart1("day8/data/mydata")).toEqual(2080);
    expect(solvePart2("day8/data/mydata")).toEqual(2477);
  });
});
