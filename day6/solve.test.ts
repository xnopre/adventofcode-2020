import {
  countAllQuestionInGroup,
  countSameQuestionAnsweredInGroup,
  solvePart1,
  solvePart2,
} from "./solve";

describe("Utils functions", () => {
  describe("countAllQuestionInGroup", () => {
    it("should work", () => {
      expect(countAllQuestionInGroup(["abc"])).toEqual(3);
      expect(countAllQuestionInGroup(["a", "b", "c"])).toEqual(3);
      expect(countAllQuestionInGroup(["ab", "ac"])).toEqual(3);
      expect(countAllQuestionInGroup(["a", "a", "a", "a"])).toEqual(1);
    });
  });

  describe("countSameQuestionAnsweredInGroup", () => {
    it("should work", () => {
      expect(countSameQuestionAnsweredInGroup(["abc"])).toEqual(3);
      expect(countSameQuestionAnsweredInGroup(["a", "b", "c"])).toEqual(0);
      expect(countSameQuestionAnsweredInGroup(["ab", "ac"])).toEqual(1);
      expect(countSameQuestionAnsweredInGroup(["a", "a", "a", "a"])).toEqual(1);
      expect(countSameQuestionAnsweredInGroup(["b"])).toEqual(1);
    });
  });
});

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day6/data/sample")).toEqual(11);
    expect(solvePart2("day6/data/sample")).toEqual(6);

    // With my real data and my solution
    expect(solvePart1("day6/data/mydata")).toEqual(6587);
    expect(solvePart2("day6/data/mydata")).toEqual(3235);
  });
});
