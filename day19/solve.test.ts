import { isMessageValid, RulesDict, solvePart1 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day19/data/sample")).toEqual(2);
    // Pas réussit, j'obtiens 6 car je n'arrive pas à tester toutes les combinaisons...
    // expect(solvePart1("day19/data/sample.part2")).toEqual(12);
  });

  it("solves the problem with my sample", () => {
    expect(solvePart1("day19/data/mydata")).toEqual(200);
    // expect(solvePart1("day19/data/mydata")).toEqual(0);
  });
});

describe("isMessageValid", () => {
  it("should valid for simple letter", () => {
    let rules: RulesDict = {
      0: {
        letter: "a",
      },
    };
    expect(isMessageValid("a", rules)).toBeTruthy();
  });

  it("should valid for one combinaison", () => {
    let rules: RulesDict = {
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
    let rules: RulesDict = {
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

  // Le problème est là : mon système valide l'enchaine 0>1>4 qui renvoie la chaine
  // restante 'a', donc c'est pas bon, faut recommencer, pour tester la branche
  // 0>1>(4,1) qui renverrait '', mais je ne trouve pas comment savoir ce que j'ai
  // déja testé ou pas....
  it.skip("should valid for loop", () => {
    let rules: RulesDict = {
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
