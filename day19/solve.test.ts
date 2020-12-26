import { isMessageValid, Rules, solve } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solve("day19/data/sample")).toEqual(2);
    expect(solve("day19/data/sample.part2")).toEqual(12);
  });

  it("solves the problem with my sample", () => {
    expect(solve("day19/data/mydata")).toEqual(200);
    expect(solve("day19/data/mydata.part2")).toEqual(407);
  });
});

describe("isMessageValid", () => {
  it("should valid for simple letter", () => {
    const rules: Rules = {
      0: {
        letter: "a",
      },
    };
    expect(isMessageValid("a", rules)).toBeTruthy();
  });

  it("should valid for one combinaison", () => {
    const rules: Rules = {
      0: {
        rules: [[4, 5]],
      },
      4: {
        letter: "a",
      },
      5: {
        letter: "b",
      },
    };
    expect(isMessageValid("ab", rules)).toBeTruthy();
  });

  it("should valid for 2 combinaisons", () => {
    const rules: Rules = {
      0: {
        rules: [
          [4, 5],
          [5, 4],
        ],
      },
      4: {
        letter: "a",
      },
      5: {
        letter: "b",
      },
    };
    expect(isMessageValid("ba", rules)).toBeTruthy();
  });

  it("should valid for loop", () => {
    const rules: Rules = {
      0: {
        rules: [[1]],
      },
      1: {
        rules: [[4], [4, 1]],
      },
      4: {
        letter: "a",
      },
      5: {
        letter: "b",
      },
    };
    expect(isMessageValid("aa", rules)).toBeTruthy();
  });
});
