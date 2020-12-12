import {
  newDirection,
  rotateWaypointCount,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day12/data/sample")).toEqual(25);
    expect(solvePart2("day12/data/sample")).toEqual(286);
    // With my real data and my solution
    expect(solvePart1("day12/data/mydata")).toEqual(1603);
    expect(solvePart2("day12/data/mydata")).toEqual(52866);
  });
});

describe("newDirection", () => {
  it("should do the job", () => {
    expect(newDirection("E", "R", 90)).toEqual("S");
    expect(newDirection("E", "R", 180)).toEqual("W");
    expect(newDirection("E", "R", 270)).toEqual("N");
    expect(newDirection("E", "L", 90)).toEqual("N");
    expect(newDirection("E", "L", 180)).toEqual("W");
    expect(newDirection("E", "L", 270)).toEqual("S");
  });
});

describe("rotateWaypointCount", () => {
  it("should do the job for rotation 'R'", () => {
    expect(
      rotateWaypointCount({ eastPosition: 10, northPosition: 4 }, "R")
    ).toEqual({ eastPosition: 4, northPosition: -10 });
    expect(
      rotateWaypointCount({ eastPosition: 4, northPosition: -10 }, "R")
    ).toEqual({ eastPosition: -10, northPosition: -4 });
    expect(
      rotateWaypointCount({ eastPosition: -10, northPosition: -4 }, "R")
    ).toEqual({ eastPosition: -4, northPosition: 10 });
    expect(
      rotateWaypointCount({ eastPosition: -4, northPosition: 10 }, "R")
    ).toEqual({ eastPosition: 10, northPosition: 4 });
  });
  it("should do the job for rotation 'L'", () => {
    expect(
      rotateWaypointCount({ eastPosition: 10, northPosition: 4 }, "L")
    ).toEqual({ eastPosition: -4, northPosition: 10 });
    expect(
      rotateWaypointCount({ eastPosition: -4, northPosition: 10 }, "L")
    ).toEqual({ eastPosition: -10, northPosition: -4 });
    expect(
      rotateWaypointCount({ eastPosition: -10, northPosition: -4 }, "L")
    ).toEqual({ eastPosition: 4, northPosition: -10 });
    expect(
      rotateWaypointCount({ eastPosition: 4, northPosition: -10 }, "L")
    ).toEqual({ eastPosition: 10, northPosition: 4 });
  });
});
