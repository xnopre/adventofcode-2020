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

/**
 * @param message Message à valider
 * @param rulesSequence Séquence de règles. Ex : [4] ou [4, 1]
 * @param rules Dictionnaire de toutes les règles
 * @return Les différents restes de messages pour les règles qui ont pu être appliquées, sinon undefined
 */
function applyOneRulesSequence(
  message: string,
  rulesSequence: RulesNumbersSequence, //
  rules: Rules
): string[] | undefined {
  let restMessages = [message];
  for (const ruleNumber of rulesSequence) {
    restMessages = flat(
      restMessages
        .map((restMessage) => applyRule(restMessage, rules, ruleNumber))
        .filter((restMessages) => restMessages != undefined)
    );
    if (restMessages === undefined) {
      return undefined;
    }
  }
  return restMessages;
}

/**
 * @param message Message à valider
 * @param rule Règle à appliquer
 * @return Reste de message si la règle a pu être appliquée, sinon undefined
 */
function applyRuleLetter(message: string, rule: Rule) {
  if (message.startsWith(rule.letter)) {
    return [message.substr(1)];
  }
  return undefined;
}

/**
 * @param sequences Plusieurs séquences à appliquer sur un message
 * @param message Message à valider
 * @param rules Dictionnaire de toutes les règles
 * @return Les différents restes de messages pour les séquences qui ont pu être appliquées, sinon undefined
 */
function applyRulesSequence(
  sequences: RulesNumbersSequence[], // ex : [[4], [4, 1]]
  message: string,
  rules: Rules
) {
  const restMessages = [];
  for (
    let sequenceIndex = 0;
    sequenceIndex < sequences.length;
    sequenceIndex++
  ) {
    const rulesSequence = sequences[sequenceIndex];
    const restMessage = applyOneRulesSequence(message, rulesSequence, rules);
    if (restMessage) {
      restMessages.push(...restMessage);
    }
  }
  return restMessages.length > 0 ? restMessages : undefined;
}

function applyRule(
  message: string,
  rules: Rules,
  ruleNumber: number
): string[] | undefined {
  const rule = rules[ruleNumber];
  if (rule.letter) {
    return applyRuleLetter(message, rule);
  }
  return applyRulesSequence(rule.rules, message, rules);
}

function isValidIfAtLeastOneMessageIsEmpty(restMessages: string[]) {
  return restMessages !== undefined && restMessages.indexOf("") >= 0;
}

export function isMessageValid(message: string, rules: Rules): boolean {
  const restMessages = applyRule(message, rules, 0);
  return isValidIfAtLeastOneMessageIsEmpty(restMessages);
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
