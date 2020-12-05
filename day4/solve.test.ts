import { fieldsPart2, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day4/data/sample")).toEqual(2);
    expect(solvePart2("day4/data/sample.invalid")).toEqual(0);
    expect(solvePart2("day4/data/sample.valid")).toEqual(4);

    // With my real data and my solution
    expect(solvePart1("day4/data/mydata")).toEqual(228);
    expect(solvePart2("day4/data/mydata")).toEqual(175);
  });
});

describe("fields validators", () => {
  it("do the right job", () => {
    expect(fieldsPart2.byr("2002")).toBeTruthy();
    expect(fieldsPart2.byr("2003")).toBeFalsy();

    expect(fieldsPart2.hgt("60in")).toBeTruthy();
    expect(fieldsPart2.hgt("190cm")).toBeTruthy();
    expect(fieldsPart2.hgt("190in")).toBeFalsy();
    expect(fieldsPart2.hgt("190")).toBeFalsy();

    expect(fieldsPart2.hcl("#123abc")).toBeTruthy();
    expect(fieldsPart2.hcl("#123abz")).toBeFalsy();
    expect(fieldsPart2.hcl("123abc")).toBeFalsy();
    expect(fieldsPart2.hcl("#12abc")).toBeFalsy();

    expect(fieldsPart2.ecl("brn")).toBeTruthy();
    expect(fieldsPart2.ecl("wat")).toBeFalsy();

    expect(fieldsPart2.pid("000000001")).toBeTruthy();
    expect(fieldsPart2.pid("0123456789")).toBeFalsy(); // Thanks to this one !!

    expect(fieldsPart2.cid("???")).toBeTruthy();
  });
});
