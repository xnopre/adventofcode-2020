import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day7/data/sample.part1")).toEqual(4);
    expect(solvePart2("day7/data/sample.part1")).toEqual(32);
    expect(solvePart2("day7/data/sample.part2")).toEqual(126);

    // With my real data and my solution
    expect(solvePart1("day7/data/mydata")).toEqual(289);
    expect(solvePart2("day7/data/mydata")).toEqual(30055);
  });
});
