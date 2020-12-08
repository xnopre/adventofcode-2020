import { clone, readLinesFromInputFile } from "../utils";

type Action = "nop" | "acc" | "jmp";

class Instruction {
  action: Action;
  count: number;
  alreadyRun = false;

  constructor(action: Action, count: number) {
    this.action = action;
    this.count = count;
  }

  toString() {
    return `Instruction[${this.action},${this.count}]`;
  }
}

function decodeInstruction(line: string) {
  const [, action, count] = line.match(/^(nop|acc|jmp)\s(.*?)$/);
  return new Instruction(action as Action, parseInt(count));
}

function readAndDecodeInstructions(filename: string) {
  return readLinesFromInputFile(filename).map((line) =>
    decodeInstruction(line)
  );
}

interface RunResult {
  acc: number;
  terminated: boolean;
}

function run(instructions: Instruction[], start: number): RunResult {
  if (start >= instructions.length) {
    return {
      acc: 0,
      terminated: true,
    };
  }
  const instruction = instructions[start];
  if (instruction.alreadyRun) {
    return {
      acc: 0,
      terminated: false,
    };
  }
  instruction.alreadyRun = true;
  switch (instruction.action) {
    case "nop":
      return run(instructions, start + 1);
    case "acc":
      const runResult = run(instructions, start + 1);
      return {
        acc: instruction.count + runResult.acc,
        terminated: runResult.terminated,
      };
    case "jmp":
      return run(instructions, start + instruction.count);
  }
}

export function solvePart1(filename: string): number {
  const instructions = readAndDecodeInstructions(filename);
  return run(instructions, 0).acc;
}

export function solvePart2(filename: string): number {
  const instructions = readAndDecodeInstructions(filename);
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].action === "jmp") {
      const instructions2 = clone(instructions);
      instructions2[i].action = "nop";
      const runResult = run(instructions2, 0);
      if (runResult.terminated) {
        return runResult.acc;
      }
    }
    // TODO en théorie il faudrait aussi essayer de changer
    //  les 'nop' en 'jmp' mais apparemment, pas besoin, ça a suffit
  }
  return 0;
}

if (require.main === module) {
  console.log("Day8 - Part 1 : answer is : " + solvePart1("day8/data/mydata"));
  console.log("Day8 - Part 2 : answer is : " + solvePart2("day8/data/mydata"));
}
