import {
  nextStep,
  nextStepPart2,
  readSeats,
  solvePart1,
  solvePart2,
} from "./solve";

describe("My solver", () => {
  it("solves the problem", () => {
    expect(solvePart1("day11/data/sample")).toEqual(37);
    expect(solvePart2("day11/data/sample")).toEqual(26);
    // With my real data and my solution
    expect(solvePart1("day11/data/mydata")).toEqual(2113);
    expect(solvePart2("day11/data/mydata")).toEqual(1865);
  });
});

describe("nextStep", () => {
  it("should do the job for step 1", () => {
    let seats = readSeats("day11/data/sample");
    const { newSeats, moved } = nextStep(seats);
    expect(moved).toBeTruthy();
    expect(newSeats).toEqual(readSeats("day11/data/sample.step1"));
  });

  it("should do the job for step 2", () => {
    let seats = readSeats("day11/data/sample.step1");
    const { newSeats, moved } = nextStep(seats);
    expect(moved).toBeTruthy();
    expect(newSeats).toEqual(readSeats("day11/data/sample.step2"));
  });
});

describe("nextStepPart2", () => {
  it("should do the job for part2 step 2", () => {
    let seats = readSeats("day11/data/sample.step1");
    const { newSeats, moved } = nextStepPart2(seats);
    expect(moved).toBeTruthy();
    expect(newSeats).toEqual(readSeats("day11/data/sample.part2.step2"));
  });

  it("should do the job for part2 step 3", () => {
    let seats = readSeats("day11/data/sample.part2.step2");
    const { newSeats, moved } = nextStepPart2(seats);
    expect(moved).toBeTruthy();
    expect(newSeats).toEqual(readSeats("day11/data/sample.part2.step3"));
  });
});
