import { countJoltsDifferences, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day10/data/sample1")).toEqual(35);
    expect(solvePart1("day10/data/sample2")).toEqual(220);
    expect(solvePart2("day10/data/sample1")).toEqual(8);
    expect(solvePart2("day10/data/sample2")).toEqual(19208);

    // With my real data and my solution
    expect(solvePart1("day10/data/mydata")).toEqual(2475);
    expect(solvePart2("day10/data/mydata")).toEqual(442136281481216);
  });
});

describe("countJoltsDifferences", () => {
  it("should count as expected", () => {
    expect(countJoltsDifferences("day10/data/sample1")).toEqual({ 1: 7, 3: 5 });
    expect(countJoltsDifferences("day10/data/sample2")).toEqual({
      1: 22,
      3: 10,
    });
  });
});
