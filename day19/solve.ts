import { flat, readLinesFromInputFile } from "../utils";

// Lecture et convertion des fichiers d'entrée

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
  const rules: Rules = {};
  for (let i = 0; i < lines.length; i++) {
    const [indexStr, rule] = lines[i].split(": ");
    const index = parseInt(indexStr);
    rules[index] = convertRule(rule);
  }
  return rules;
}

function readRulesAndMessages(
  filename: string
): { rules: Rules; messages: string[] } {
  const lines = readLinesFromInputFile(filename, false);
  const index = lines.findIndex((line) => line.trim().length === 0);
  const rulesStr = lines.slice(0, index);
  const messages = lines.slice(index + 1).filter((s) => s.trim().length > 0);
  return { rules: convertRules(rulesStr), messages };
}

// Implémentation solution

type RulesNumbersSequence = number[];

interface Rule {
  letter?: string;
  rules?: RulesNumbersSequence[];
}

export interface Rules {
  [index: number]: Rule;
}

type ApplyResult =
  | { applicable: false }
  | { applicable: true; restOfMessages: string[] };

const NOT_APPLICABLE: ApplyResult = { applicable: false };

function applyOneRulesSequence(
  message: string,
  rulesSequence: RulesNumbersSequence, //
  rules: Rules
): ApplyResult {
  let restOfMessages = [message];
  for (const ruleNumber of rulesSequence) {
    restOfMessages = restOfMessages
      .map((restMessage) => applyRule(restMessage, rules, ruleNumber))
      .flatMap((appliedResult) =>
        appliedResult.applicable ? appliedResult.restOfMessages : []
      );
    if (restOfMessages.length === 0) {
      return NOT_APPLICABLE;
    }
  }
  return {
    applicable: true,
    restOfMessages,
  };
}

function applyRuleLetter(message: string, rule: Rule): ApplyResult {
  if (message.startsWith(rule.letter)) {
    const restOfMessage = message.substr(1);
    return {
      applicable: true,
      restOfMessages: [restOfMessage],
    };
  }
  return NOT_APPLICABLE;
}

function applyRulesSequence(
  sequences: RulesNumbersSequence[], // ex : [[4], [4, 1]]
  message: string,
  rules: Rules
): ApplyResult {
  const restOfMessages = [];
  for (const rulesSequence of sequences) {
    const appliedResult = applyOneRulesSequence(message, rulesSequence, rules);
    if (appliedResult.applicable) {
      restOfMessages.push(...appliedResult.restOfMessages);
    }
  }
  return restOfMessages.length > 0
    ? { applicable: true, restOfMessages }
    : NOT_APPLICABLE;
}

function applyRule(
  message: string,
  rules: Rules,
  ruleNumber: number
): ApplyResult {
  const rule = rules[ruleNumber];
  if (rule.letter) {
    return applyRuleLetter(message, rule);
  }
  return applyRulesSequence(rule.rules, message, rules);
}

function isValidIfAtLeastOneMessageIsEmpty(restMessages: string[]) {
  return restMessages.indexOf("") >= 0;
}

export function isMessageValid(message: string, rules: Rules): boolean {
  const appliedResult = applyRule(message, rules, 0);
  return appliedResult.applicable
    ? isValidIfAtLeastOneMessageIsEmpty(appliedResult.restOfMessages)
    : false;
}

export function solve(filename: string): number {
  const { rules, messages } = readRulesAndMessages(filename);
  const validMessages = messages.filter((message) =>
    isMessageValid(message, rules)
  );
  return validMessages.length;
}

if (require.main === module) {
  console.log("Day19 - Part 1 : answer is : " + solve("day19/data/mydata"));
  console.log(
    "Day19 - Part 2 : answer is : " + solve("day19/data/mydata.part2")
  );
}
