import {
  convertToLinkedList,
  doMoves,
  fromLinkedList,
  labelsAfter1,
  move,
  solvePart1,
  solvePart2,
} from "./solve2";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day23/data/sample")).toEqual("67384529");
    expect(solvePart2("day23/data/sample")).toEqual(149245887792);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day23/data/mydata")).toEqual("47382659");
    expect(solvePart2("day23/data/mydata")).toEqual(42271866720);
  });
});

describe("convertToLinkedList", () => {
  it("should do the job #1", () => {
    const arr = [3, 8, 9, 1, 2, 5, 4, 6, 7];
    const expected = [3, 2, 5, 8, 6, 4, 7, 3, 9, 1];
    expect(convertToLinkedList(arr)).toEqual(expected);
  });

  it("should do the job #2", () => {
    const arr = [2, 8, 9, 1, 5, 4, 6, 7, 3];
    const expected = [2, 5, 8, 2, 6, 4, 7, 3, 9, 1];
    expect(convertToLinkedList(arr)).toEqual(expected);
  });
});

describe("move", () => {
  it("should do the job move 1", () => {
    const before = [3, 2, 5, 8, 6, 4, 7, 3, 9, 1];
    const after = [2, 5, 8, 2, 6, 4, 7, 3, 9, 1];
    expect(move(before)).toEqual(after);
  });

  it("should do the job move 1", () => {
    const before = [2, 5, 8, 2, 6, 4, 7, 3, 9, 1];
    const after = [5, 3, 5, 2, 6, 4, 7, 8, 9, 1];
    expect(move(before)).toEqual(after);
  });
});

describe("doMoves", () => {
  it("should do the job", () => {
    const before = [3, 2, 5, 8, 6, 4, 7, 3, 9, 1];
    const after = [8, 9, 6, 7, 1, 8, 5, 4, 3, 2];
    expect(doMoves(before, 10)).toEqual(after);
  });
});

describe("fromToLinkedList", () => {
  it("should do the job #1", () => {
    const arr = [3, 2, 5, 8, 6, 4, 7, 3, 9, 1];
    const expected = [3, 8, 9, 1, 2, 5, 4, 6, 7];
    expect(fromLinkedList(arr)).toEqual(expected);
  });
  it("should do the job #2", () => {
    const arr = [2, 5, 8, 2, 6, 4, 7, 3, 9, 1];
    const expected = [2, 8, 9, 1, 5, 4, 6, 7, 3];
    expect(fromLinkedList(arr)).toEqual(expected);
  });
});

describe("labelsAfter1", () => {
  it("should do the job", () => {
    const arr = [8, 9, 6, 7, 1, 8, 5, 4, 3, 2];
    expect(labelsAfter1(arr)).toEqual("92658374");
  });
});
