import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day16/data/sample.part1")).toEqual(71);
    expect(solvePart2("day16/data/sample.part2", "class")).toEqual(12);
    // With my real data and my solution
    expect(solvePart1("day16/data/mydata")).toEqual(29019);
    expect(solvePart2("day16/data/mydata")).toEqual(517827547723);
  });
});
