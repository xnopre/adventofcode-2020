import { encrypt, findLoopSize, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day25/data/sample")).toEqual(14897079);
    expect(solvePart2("day25/data/sample")).toEqual(0);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day25/data/mydata")).toEqual(4441893);
    expect(solvePart2("day25/data/mydata")).toEqual(0);
  });
});

describe("findLoopSize", () => {
  it("should find the loop size", () => {
    expect(findLoopSize(5764801)).toEqual(8);
    expect(findLoopSize(17807724)).toEqual(11);
  });
});

describe("encrypt", () => {
  it("should encrypt as expected", () => {
    expect(encrypt(17807724, 8)).toEqual(14897079);
    expect(encrypt(5764801, 11)).toEqual(14897079);
  });
});
