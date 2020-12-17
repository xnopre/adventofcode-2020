import { Cube, Line, runOneCycle, solvePart1, solvePart2 } from "./solve";

describe("My solver", () => {
  it("solves the problem with sample data", () => {
    expect(solvePart1("day17/data/sample")).toEqual(112);
    expect(solvePart2("day17/data/sample")).toEqual(848);
  });

  it("solves the problem with my sample", () => {
    // With my real data and my solution
    expect(solvePart1("day17/data/mydata")).toEqual(372);
    expect(solvePart2("day17/data/mydata")).toEqual(1896);
  });
});

function line(s: string) {
  return s.split("") as Line;
}

describe("runOneCycle", () => {
  // L'exemple fournit n'est pas bon, du moins il est "recadré"
  it.skip("should to the job for cycle 1", () => {
    const cubes: Cube = [[line(".#."), line("..#"), line("###")]];
    const expected: Cube = [
      [
        line("....."),
        line("....."),
        line("....."),
        line("....."),
        line("....."),
      ],
      [
        line("....."),
        line(".#..."),
        line("...#."),
        line("..#.."),
        line("....."),
      ],
      [
        line("....."),
        line(".#.#."),
        line("..##."),
        line("..#.."),
        line("....."),
      ],
      [
        line("....."),
        line(".#..."),
        line("...#."),
        line("..#.."),
        line("....."),
      ],
      [
        line("....."),
        line("....."),
        line("....."),
        line("....."),
        line("....."),
      ],
    ];
    expect(runOneCycle(cubes)).toEqual(expected);
  });

  it("should to the job for cycle 2", () => {
    const cube: Cube = [
      [line("#.."), line("..#"), line(".#.")],
      [line("#.#"), line(".##"), line(".#.")],
      [line("#.."), line("..#"), line(".#.")],
    ];
    const expected: Cube = [
      [
        line("....."),
        line("....."),
        line("..#.."),
        line("....."),
        line("....."),
      ],
      [
        line("..#.."),
        line(".#..#"),
        line("....#"),
        line(".#..."),
        line("....."),
      ],
      [
        line("##..."),
        line("##..."),
        line("#...."),
        line("....#"),
        line(".###."),
      ],
      [
        line("..#.."),
        line(".#..#"),
        line("....#"),
        line(".#..."),
        line("....."),
      ],
      [
        line("....."),
        line("....."),
        line("..#.."),
        line("....."),
        line("....."),
      ],
    ];
    expect(runOneCycle(cube)).toEqual(expected);
  });
});
