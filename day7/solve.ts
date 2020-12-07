import { readLinesFromInputFile } from "../utils";

interface BagContent {
  [bagName: string]: number;
}

interface Rules {
  [bagName: string]: BagContent;
}

function bagContentIsNotEmpty(rightPart) {
  return !rightPart.startsWith("no");
}

function trim(s) {
  return s.trim();
}

function extractBagNameAndCount(countAndBagName: string) {
  const index = countAndBagName.indexOf(" ");
  const count = parseInt(countAndBagName.substr(0, index));
  const bagName = countAndBagName.substr(index + 1).trim();
  return { bagName, count };
}

function decodeRightPartToBagContent(rightPart: string) {
  const bagContent: BagContent = rightPart
    .split(",")
    .map(trim)
    .filter(bagContentIsNotEmpty)
    .map((s) => s.substr(0, s.indexOf("bag")))
    .map(extractBagNameAndCount)
    .reduce((acc, { bagName, count }) => {
      acc[bagName] = count;
      return acc;
    }, {} as BagContent);
  return bagContent;
}

function decodeOneBagRule(line: string): Rules {
  const searchString = " bags contain ";
  const index = line.indexOf(searchString);
  const bag = line.substr(0, index);
  const rightPart = line.substr(index + searchString.length);
  const bagContent = decodeRightPartToBagContent(rightPart);
  return {
    [bag]: bagContent,
  };
}

function buildRules(filename: string): Rules {
  const lines = readLinesFromInputFile(filename);
  return lines
    .map((line) => decodeOneBagRule(line))
    .reduce((acc, value) => {
      return Object.assign(acc, value);
    }, {});
}

function canContain(rules: Rules, bagName: string, bagNameToContain: string) {
  const bagContainer = rules[bagName];
  if (bagContainer[bagNameToContain]) {
    return true;
  }
  for (const subKey in bagContainer)
    if (canContain(rules, subKey, bagNameToContain)) {
      return true;
    }
}

export function solvePart1(filename: string): number {
  const rules = buildRules(filename);
  let count = 0;
  for (const bagName in rules) {
    if (canContain(rules, bagName, "shiny gold")) {
      count++;
    }
  }
  return count;
}

function countAllBags(rules: Rules, bagName: string) {
  const rukeForThisBag = rules[bagName];
  let count = 0;
  for (const key in rukeForThisBag) {
    count +=
      rukeForThisBag[key] + rukeForThisBag[key] * countAllBags(rules, key);
  }
  return count;
}

export function solvePart2(filename: string): number {
  const rules = buildRules(filename);
  return countAllBags(rules, "shiny gold");
}

if (require.main === module) {
  console.log("Day7 - Part 1 : answer is : " + solvePart1("day7/data/mydata"));
  console.log("Day7 - Part 2 : answer is : " + solvePart2("day7/data/mydata"));
}
