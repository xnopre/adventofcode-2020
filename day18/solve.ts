import { readLinesFromInputFile } from "../utils";

const SIMPLE_OPERATION = /^(\d+)\s(.)\s(\d+)(.*)$/;

export function evaluateSimple(s: string): number {
  const match = s.match(SIMPLE_OPERATION);
  if (!match) {
    return parseInt(s);
  }
  const [, v1, op, v2, rest] = match;
  const value =
    op === "+" ? parseInt(v1) + parseInt(v2) : parseInt(v1) * parseInt(v2);
  if (rest.trim().length === 0) {
    return value;
  }
  return evaluateSimple(`${value}${rest}`);
}

const EXPRESSION_WITH_MULTIPLY = /^(.*)\s\*\s(.*)$/;

export function evaluateSimple2(s: string): number {
  s = s.trim();
  const matchMultiply = s.match(EXPRESSION_WITH_MULTIPLY);
  if (matchMultiply) {
    const [, left, right] = matchMultiply;
    return evaluateSimple2(left) * evaluateSimple2(right);
  }
  return evaluateSimple(s);
}

type EvaluationSimple = (s: string) => number;

const EXPRESSION_WITH_PARENTHESES = /^(.*)\(([0-9*+ ]*)\)(.*)$/;

export function evaluate(s: string, fEvaluateSimple: EvaluationSimple): number {
  const match = s.match(EXPRESSION_WITH_PARENTHESES);
  if (!match) {
    return fEvaluateSimple(s);
  }
  const [, prefix, simpleExp, suffix] = match;
  return evaluate(
    `${prefix}${evaluate(simpleExp, fEvaluateSimple)}${suffix}`,
    fEvaluateSimple
  );
}

function solve(filename: string, fEvaluateSimple: (s: string) => number) {
  return readLinesFromInputFile(filename)
    .map((line) => evaluate(line, fEvaluateSimple))
    .reduce((acc, val) => acc + val, 0);
}

export function solvePart1(filename: string): number {
  return solve(filename, evaluateSimple);
}

export function solvePart2(filename: string): number {
  return solve(filename, evaluateSimple2);
}

if (require.main === module) {
  console.log(
    "Day18 - Part 1 : answer is : " + solvePart1("day18/data/mydata")
  );
  console.log(
    "Day18 - Part 2 : answer is : " + solvePart2("day18/data/mydata")
  );
}
