import {
  convertToSeatId,
  getCol,
  getRow,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day5/data/sample")).toEqual(820);

    // With my real data and my solution
    expect(solvePart1("day5/data/mydata")).toEqual(980);
    expect(solvePart2("day5/data/mydata")).toEqual(607);
  });
});

describe("getRow", () => {
  it("should convert as expected", () => {
    expect(getRow("FBFBBFF")).toEqual(44);
    expect(getRow("BFFFBBF")).toEqual(70);
    expect(getRow("FFFBBBF")).toEqual(14);
    expect(getRow("BBFFBBF")).toEqual(102);
  });
});

describe("getCol", () => {
  it("should convert as expected", () => {
    expect(getCol("RLR")).toEqual(5);
    expect(getCol("RRR")).toEqual(7);
    expect(getCol("RLL")).toEqual(4);
  });
});

describe("convertToSeatNumber", () => {
  it("should convert as expected", () => {
    expect(convertToSeatId("FBFBBFFRLR")).toEqual(357);
    expect(convertToSeatId("BFFFBBFRRR")).toEqual(567);
    expect(convertToSeatId("FFFBBBFRRR")).toEqual(119);
    expect(convertToSeatId("BBFFBBFRLL")).toEqual(820);
  });
});
