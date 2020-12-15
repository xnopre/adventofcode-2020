import { applyMask, getAddresses, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day14/data/sample.part1")).toEqual(165);
    expect(solvePart2("day14/data/sample.part2")).toEqual(208);
    // With my real data and my solution
    expect(solvePart1("day14/data/mydata")).toEqual(12408060320841);
    expect(solvePart2("day14/data/mydata")).toEqual(4466434626828);
  });
});

describe("getValue", () => {
  it("should convert values", () => {
    let debug = false;
    expect(applyMask(7, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX10X")).toEqual(5);
    expect(applyMask(11, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")).toEqual(73);
    expect(applyMask(101, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")).toEqual(101);
    expect(applyMask(0, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")).toEqual(64);
    expect(applyMask(23023, "111000X01101101X10001X01110X01000001")).toEqual(
      60358712641
    );
    expect(
      applyMask(332644116, "010X101X00X110XXX011010100X10011100X")
    ).toEqual(20192645944);
  });
});

describe("getAddresses", () => {
  it("should do the job for address 42", () => {
    const mask = "000000000000000000000000000000X1001X";
    expect(getAddresses(42, mask)).toEqual([26, 27, 58, 59]);
  });
  it("should do the job for address 26", () => {
    const mask = "00000000000000000000000000000000X0XX";
    expect(getAddresses(26, mask)).toEqual([16, 17, 18, 19, 24, 25, 26, 27]);
  });
});
