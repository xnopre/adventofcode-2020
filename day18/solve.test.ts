import {
  evaluate,
  evaluateSimple,
  evaluateSimple2,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day18/data/sample")).toEqual(26335);
    expect(solvePart2("day18/data/sample")).toEqual(693891);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day18/data/mydata")).toEqual(8298263963837);
    expect(solvePart2("day18/data/mydata")).toEqual(145575710203332);
  });
});

describe("evaluate", () => {
  it("should evaluate simple expression without parentheses", () => {
    expect(evaluate("1 + 2 * 3 + 4 * 5 + 6", evaluateSimple)).toEqual(71);
  });
  it("should evaluate expression with 1 simple parente", () => {
    expect(evaluate("1 + (2 * 3)", evaluateSimple)).toEqual(7);
  });
  it("should evaluate expression with 2 simple parente", () => {
    expect(evaluate("1 + (2 * (1 + 2))", evaluateSimple)).toEqual(7);
  });
  it("should evaluate full expression", () => {
    expect(evaluate("1 + (2 * 3) + (4 * (5 + 6))", evaluateSimple)).toEqual(51);
  });
  it("should evaluate some other more complicated expressions", () => {
    expect(evaluate("2 * 3 + (4 * 5) ", evaluateSimple)).toEqual(26);
    expect(evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3) ", evaluateSimple)).toEqual(
      437
    );
    expect(
      evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) ", evaluateSimple)
    ).toEqual(12240);
    expect(
      evaluate(
        "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 ",
        evaluateSimple
      )
    ).toEqual(13632);
  });
});

describe("evaluate2", () => {
  it("should evaluate with new rules", () => {
    expect(evaluate("1 + (2 * 3) + (4 * (5 + 6))  ", evaluateSimple2)).toEqual(
      51
    );
    expect(evaluate("2 * 3 + (4 * 5) ", evaluateSimple2)).toEqual(46);
    expect(evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3) ", evaluateSimple2)).toEqual(
      1445
    );
    expect(
      evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) ", evaluateSimple2)
    ).toEqual(669060);
    expect(
      evaluate(
        "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 ",
        evaluateSimple2
      )
    ).toEqual(23340);
  });
});

describe("", () => {
  it("should ", () => {
    expect(evaluateSimple2("7 * 3 * 3 + 9 * 3 + 56")).toEqual(14868);
  });
});
