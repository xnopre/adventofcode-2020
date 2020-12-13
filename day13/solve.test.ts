import {
  findBusWithMinTimeToWait,
  findT,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day13/data/sample")).toEqual(295);
    expect(solvePart2("day13/data/sample")).toEqual(1068781);
    // With my real data and my solution
    expect(solvePart1("day13/data/mydata")).toEqual(8063);
    expect(solvePart2("day13/data/mydata")).toEqual(775230782877242);
  });
});

describe("findBusWithMinTimeToWait", () => {
  it("should do the job", () => {
    expect(findBusWithMinTimeToWait([7, 13, 59, 31, 19], 939)).toEqual({
      id: 59,
      min: 5,
    });
  });
});

describe("findT", () => {
  it("should find the T", () => {
    expect(findT("7,13")).toEqual(77);
    expect(findT("17,x,13,19")).toEqual(3417);
    expect(findT("67,7,59,61")).toEqual(754018);
    expect(findT("67,x,7,59,61")).toEqual(779210);
    expect(findT("67,7,x,59,61")).toEqual(1261476);
    expect(findT("1789,37,47,1889")).toEqual(1202161486);
  });
});
