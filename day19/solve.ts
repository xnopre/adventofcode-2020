import { readLinesFromInputFile } from "../utils";

function readData(filename: string) {
  const lines = readLinesFromInputFile(filename, false);
  const index = lines.findIndex((line) => line.trim().length === 0);
  const rulesStr = lines.slice(0, index);
  const messages = lines.slice(index + 1).filter((s) => s.trim().length > 0);
  return { rulesStr, messages };
}

interface Rule {
  letter?: string;
  rules?: number[][];
}

export interface RulesDict {
  [index: number]: Rule;
}

function convertRule(s: string): Rule {
  s = s.trim();
  if (s.startsWith('"')) {
    return {
      letter: s.substr(1, s.length - 2),
    };
  }
  const parts = s.split("|");
  const rules = parts.map((s) => {
    const otherRulesStr = s.trim().split(" ");
    return otherRulesStr.map((ns) => parseInt(ns));
  });
  return {
    rules,
  };
}

function convertRules(lines: string[]) {
  const rules: RulesDict = {};
  for (let i = 0; i < lines.length; i++) {
    const [indexStr, rule] = lines[i].split(": ");
    const index = parseInt(indexStr);
    rules[index] = convertRule(rule);
  }
  return rules;
}

function isMessageValidForRule(
  message: string,
  rules: RulesDict,
  index: number
): string | undefined {
  const rule = rules[index];
  if (rule.letter) {
    if (message.startsWith(rule.letter)) {
      return message.substr(1);
    }
    return undefined;
  }
  for (
    let sequenceIndex = 0;
    sequenceIndex < rule.rules.length;
    sequenceIndex++
  ) {
    const rulesSequence = rule.rules[sequenceIndex];
    let restMessage = message;
    let valid = true;
    for (let j = 0; valid && j < rulesSequence.length; j++) {
      let index = rulesSequence[j];
      restMessage = isMessageValidForRule(restMessage, rules, index);
      if (restMessage === undefined) {
        valid = false;
        break;
      }
    }
    if (valid) {
      // console.log(`${message} / ${JSON.stringify(rule)} --> ${restMessage}`);
      return restMessage;
    }
  }

  // console.log(`${message} / ${JSON.stringify(rule)} --> undefined`);
  return undefined;
}

export function isMessageValid(message: string, rules: RulesDict) {
  const rest = isMessageValidForRule(message, rules, 0);
  return rest === "";
}

export function solvePart1(filename: string): number {
  const { rulesStr, messages } = readData(filename);
  const rules = convertRules(rulesStr);
  // console.log("rules=", JSON.stringify(rules, null, 2));
  const validMessages = messages.filter((message) =>
    isMessageValid(message, rules)
  );
  return validMessages.length;
}

if (require.main === module) {
  console.log(
    "Day19 - Part 1 : answer is : " + solvePart1("day19/data/mydata")
  );
  console.log(
    "Day19 - Part 2 : answer is : " + solvePart1("day19/data/mydata.part2")
  );
}
