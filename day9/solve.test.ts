import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day9/data/sample", 5)).toEqual(127);
    expect(solvePart2("day9/data/sample", 5)).toEqual(62);

    // With my real data and my solution
    expect(solvePart1("day9/data/mydata", 25)).toEqual(556543474);
    expect(solvePart2("day9/data/mydata", 25)).toEqual(76096372);
  });
});
