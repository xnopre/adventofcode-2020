import { solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day22/data/sample")).toEqual(306);
    // expect(solvePart2("day22/data/sample")).toEqual(0);
  });

  it.skip("solves the problem with my sample", () => {
    expect(solvePart1("day22/data/mydata")).toEqual(35005);
    // expect(solvePart2("day22/data/mydata")).toEqual(0);
  });
});
