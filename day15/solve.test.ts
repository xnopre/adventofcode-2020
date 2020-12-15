import { solvePart1 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("0,3,6", 2020)).toEqual(436);
    expect(solvePart1("1,3,2", 2020)).toEqual(1);
    expect(solvePart1("2,1,3", 2020)).toEqual(10);
    expect(solvePart1("1,2,3", 2020)).toEqual(27);
    expect(solvePart1("2,3,1", 2020)).toEqual(78);
    expect(solvePart1("3,2,1", 2020)).toEqual(438);
    expect(solvePart1("3,1,2", 2020)).toEqual(1836);

    // Trop long
    // expect(solvePart1("0,3,6", 30000000)).toEqual(175594);
    // expect(solvePart1("1,3,2", 30000000)).toEqual(2578);
    // expect(solvePart1("2,1,3", 30000000)).toEqual(3544142);
    // expect(solvePart1("1,2,3", 30000000)).toEqual(261214);
    // expect(solvePart1("2,3,1", 30000000)).toEqual(6895259);
    // expect(solvePart1("3,2,1", 30000000)).toEqual(18);
    // expect(solvePart1("3,1,2", 30000000)).toEqual(362);

    // With my real data and my solution
    expect(solvePart1("0,13,1,8,6,15", 2020)).toEqual(1618);
    //  Brut force pour mes data
    // expect(solvePart1("0,13,1,8,6,15", 30000000)).toEqual(548531);
  });
});
