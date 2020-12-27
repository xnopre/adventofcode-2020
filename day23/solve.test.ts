import {
  convertToCupsArray,
  doMoves,
  labelsAfter1,
  move,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day23/data/sample")).toEqual("67384529");
    // expect(solvePart2("day23/data/sample")).toEqual(149245887792);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day23/data/mydata")).toEqual("47382659");
    // expect(solvePart2("day23/data/mydata")).toEqual(0);
  });
});

describe("move", () => {
  it("should do the job", () => {
    const expected = [2, 8, 9, 1, 5, 4, 6, 7, 3];
    expect(move(convertToCupsArray("389125467"))).toEqual(expected);
  });
  it("should do the job", () => {
    const expected = [5, 4, 6, 7, 8, 9, 1, 3, 2];
    expect(move(convertToCupsArray("289154673"))).toEqual(expected);
  });
});

describe("doMoves", () => {
  it("should do the job", () => {
    const expected = [8, 3, 7, 4, 1, 9, 2, 6, 5];
    expect(doMoves(convertToCupsArray("389125467"), 10)).toEqual(expected);
  });
});

describe("labelsAfter1", () => {
  it("should do the job", () => {
    expect(labelsAfter1(convertToCupsArray("837419265"))).toEqual("92658374");
  });
});
