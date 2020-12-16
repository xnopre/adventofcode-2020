import { readLinesFromInputFile } from "../utils";

interface Range {
  min: number;
  max: number;
}

interface Rule {
  name: string;
  range1: Range;
  range2: Range;
}

type Ticket = number[];

interface Data {
  rules: Rule[];
  myTicket: Ticket;
  otherTickets: Ticket[];
}

function readRules(lines: string[]): Rule[] {
  return lines.map((line) => {
    const [, name, min1, max1, min2, max2] = line.match(
      /^(.+):.(.+)-(.+).or.(.+)-(.+)$/
    );
    return {
      name,
      range1: {
        min: parseInt(min1),
        max: parseInt(max1),
      },
      range2: {
        min: parseInt(min2),
        max: parseInt(max2),
      },
    };
  });
}

function convertTicket(line: string): Ticket {
  return line.split(",").map((s) => parseInt(s));
}

function readMyTicket(line: string): Ticket {
  return convertTicket(line);
}

function readOtherTickets(lines: string[]): Ticket[] {
  return lines.map((line) => convertTicket(line));
}

function readData(lines: string[]): Data {
  let indexYourTicket = lines.indexOf("your ticket:");
  let indexNearbyTickets = lines.indexOf("nearby tickets:");
  const linesRules = lines.slice(0, indexYourTicket - 1);
  const lineMyTicket = lines.slice(
    indexYourTicket + 1,
    indexNearbyTickets - 1
  )[0];
  const linesOtherTickets = lines
    .slice(indexNearbyTickets + 1)
    .filter((line) => line.trim().length > 0);
  return {
    rules: readRules(linesRules),
    myTicket: readMyTicket(lineMyTicket),
    otherTickets: readOtherTickets(linesOtherTickets),
  };
}

function isInRange(n: number, range: Range) {
  return n >= range.min && n <= range.max;
}

function isValid(n: number, rule: Rule) {
  return isInRange(n, rule.range1) || isInRange(n, rule.range2);
}

function isNotValid(n: number, rules: Rule[]) {
  const firstValidRule = rules.find((rule) => isValid(n, rule));
  return firstValidRule === undefined;
}

function getAllBadNumbers(data: Data) {
  const badNumbers: number[] = [];
  let sumBadNumber = 0;
  data.otherTickets.forEach((ticket) => {
    ticket.forEach((n) => {
      if (isNotValid(n, data.rules)) {
        badNumbers.push(n);
        sumBadNumber += n;
      }
    });
  });
  return { badNumbers, sumBadNumber };
}

function readDataFromFile(filename: string): Data {
  const lines = readLinesFromInputFile(filename, false).filter(
    (line) => !line.startsWith("#")
  );
  return readData(lines);
}

export function solvePart1(filename: string): number {
  const data = readDataFromFile(filename);
  const { sumBadNumber } = getAllBadNumbers(data);
  return sumBadNumber;
}

function filterBadTickets(tickets: Ticket[], badNumbers: number[]) {
  return tickets.filter((ticket) => {
    return (
      ticket.filter((n) => {
        return badNumbers.indexOf(n) !== -1;
      }).length === 0
    );
  });
}

function isOK(rule: Rule, tickets: Ticket[], fieldIndex: number) {
  for (let i = 0; i < tickets.length; i++) {
    const n = tickets[i][fieldIndex];
    if (!isValid(n, rule)) {
      return false;
    }
  }
  return true;
}

function findRuleNameWithOneIndex(result: {}) {
  for (const key in result) {
    if (result[key].length === 1) {
      return key;
    }
  }
  return undefined;
}

interface FieldNameAndIndices {
  [name: string]: number[];
}

function findFieldsOrder(rules: Rule[], tickets: Ticket[]) {
  const ticketLen = tickets[0].length;
  const allFieldsNamesAndIndices: FieldNameAndIndices = {};
  rules.forEach((rule) => {
    allFieldsNamesAndIndices[rule.name] = [];
    for (let fieldIndex = 0; fieldIndex < ticketLen; fieldIndex++) {
      if (isOK(rule, tickets, fieldIndex)) {
        allFieldsNamesAndIndices[rule.name].push(fieldIndex);
      }
    }
  });
  const finalFieldsNamesAndIndices: FieldNameAndIndices = {};
  let ruleNameWithOneIndex = findRuleNameWithOneIndex(allFieldsNamesAndIndices);
  while (ruleNameWithOneIndex) {
    finalFieldsNamesAndIndices[ruleNameWithOneIndex] =
      allFieldsNamesAndIndices[ruleNameWithOneIndex];
    const indexToRemove = allFieldsNamesAndIndices[ruleNameWithOneIndex][0];
    delete allFieldsNamesAndIndices[ruleNameWithOneIndex];
    for (const key in allFieldsNamesAndIndices) {
      const i = allFieldsNamesAndIndices[key].indexOf(indexToRemove);
      allFieldsNamesAndIndices[key].splice(i, 1);
    }
    ruleNameWithOneIndex = findRuleNameWithOneIndex(allFieldsNamesAndIndices);
  }
  return finalFieldsNamesAndIndices;
}

function findFieldsIndicesToKeep(
  fieldsOrder: { [p: string]: number[] },
  fieldPrefixToMultiply: string
) {
  const fieldsIndicesToKeep: number[] = [];
  for (const key in fieldsOrder) {
    if (key.startsWith(fieldPrefixToMultiply)) {
      fieldsIndicesToKeep.push(fieldsOrder[key][0]);
    }
  }
  return fieldsIndicesToKeep;
}

export function solvePart2(
  filename: string,
  fieldPrefixToMultiply = "departure"
): number {
  const data = readDataFromFile(filename);
  const { badNumbers } = getAllBadNumbers(data);
  data.otherTickets = filterBadTickets(data.otherTickets, badNumbers);
  const allTickets = [data.myTicket, ...data.otherTickets];
  const fieldsOrder = findFieldsOrder(data.rules, allTickets);
  const fieldsNamesToKeep = findFieldsIndicesToKeep(
    fieldsOrder,
    fieldPrefixToMultiply
  );
  return fieldsNamesToKeep.reduce(
    (acc, index) => acc * data.myTicket[index],
    1
  );
}

if (require.main === module) {
  console.log(
    "Day16 - Part 1 : answer is : " + solvePart1("day16/data/mydata")
  );
  console.log(
    "Day16 - Part 2 : answer is : " +
      solvePart2("day16/data/mydata", "departure")
  );
}
