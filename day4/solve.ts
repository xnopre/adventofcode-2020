import * as fs from "fs";

function readPassportsFromFile(filename: string) {
  const content = fs.readFileSync(filename, "utf-8");
  return content.split("\n\n");
}

const fieldsPart1 = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid" /*, "cid"*/,
];

function isValidPart1(passport: string) {
  return (
    fieldsPart1.filter((field) => passport.indexOf(`${field}:`) >= 0).length ===
    fieldsPart1.length
  );
}

export function solvePart1(filename: string): number {
  const passports = readPassportsFromFile(filename);
  return passports.filter(isValidPart1).length;
}

function is4digits(value) {
  return value.match(/^[0-9]{4}$/) !== null;
}

export const fieldsPart2 = {
  byr: (value) => {
    const n = parseInt(value);
    return is4digits(value) && n >= 1920 && n <= 2002;
  },
  iyr: (value) => {
    const n = parseInt(value);
    return is4digits(value) && n >= 2010 && n <= 2020;
  },
  eyr: (value) => {
    const n = parseInt(value);
    return is4digits(value) && n >= 2020 && n <= 2030;
  },
  hgt: (value) => {
    const n = parseInt(value);
    if (value.match(/^[0-9]{2,3}(in|cm)$/) === null) {
      return;
    }
    if (value.endsWith("cm")) {
      return n >= 150 && n <= 193;
    }
    if (value.endsWith("in")) {
      return n >= 59 && n <= 76;
    }
    return false;
  },
  hcl: (value) => {
    return value.match(/^#[0-9a-f]{6}$/) !== null;
  },
  ecl: (value) => {
    const expected = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return expected.indexOf(value) >= 0;
  },
  pid: (value) => {
    return value.match(/^[0-9]{9}$/) !== null;
  },
  cid: (value) => true,
};

function isFieldValid(field) {
  const [key, value] = field.split(":");
  return fieldsPart2[key](value);
}

function isValidPart2(passport: string) {
  const fields = passport
    .replace(/\n/g, ",")
    .replace(/,/g, " ")
    .split(" ")
    .filter((s) => s.trim().length > 0);
  return fields.every(isFieldValid);
}

export function solvePart2(filename: string): number {
  const passports = readPassportsFromFile(filename);
  return passports.filter(isValidPart1).filter(isValidPart2).length;
}

if (require.main === module) {
  console.log("Day4 - Part 1 : answer is : " + solvePart1("day4/data/mydata"));
  console.log("Day4 - Part 2 : answer is : " + solvePart2("day4/data/mydata"));
}
