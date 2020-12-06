import * as fs from "fs";

function collectAllQuestions(answers: string[]) {
  const allAnswers = answers.join("");
  const allQuestions = new Set<string>();
  for (const answer of allAnswers) {
    allQuestions.add(answer);
  }
  return allQuestions;
}

export function countAllQuestionInGroup(answers: string[]): number {
  return collectAllQuestions(answers).size;
}

function collectAllGroupsAnswers(filename: string): string[][] {
  const content = fs.readFileSync(filename, "utf-8");
  return content
    .split("\n\n")
    .map((group) => group.split("\n").filter((line) => line.length > 0));
}

export function solvePart1(filename: string): number {
  return collectAllGroupsAnswers(filename)
    .map(countAllQuestionInGroup)
    .reduce((acc, value) => acc + value, 0);
}

export function countSameQuestionAnsweredInGroup(
  answersInGroup: string[]
): number {
  let allQuestions = Array.from(collectAllQuestions(answersInGroup));
  for (const answerOnePerson of answersInGroup) {
    allQuestions = allQuestions.filter(
      (letter) => answerOnePerson.indexOf(letter) >= 0
    );
  }
  return allQuestions.length;
}

export function solvePart2(filename: string): number {
  const groups = collectAllGroupsAnswers(filename);
  return groups
    .map(countSameQuestionAnsweredInGroup)
    .reduce((acc, value) => acc + value, 0);
}

if (require.main === module) {
  console.log("Day6 - Part 1 : answer is : " + solvePart1("day6/data/mydata"));
  console.log("Day6 - Part 2 : answer is : " + solvePart2("day6/data/mydata"));
}
