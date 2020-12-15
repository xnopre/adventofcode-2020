import { readLinesFromInputFile } from "../utils";

function or(value: number, maskOr: number) {
  return Number(BigInt(value) | BigInt(maskOr));
}

function and(value: number, maskAnd: number) {
  return Number(BigInt(value) & BigInt(maskAnd));
}

export function applyMask(value: number, mask: string) {
  const maskOr = parseInt(mask.replace(/X/g, "0"), 2);
  const maskAnd = parseInt(mask.replace(/X/g, "1"), 2);
  return and(or(value, maskOr), maskAnd);
}

interface Memory {
  [key: number]: number;
}

function sum(mem: Memory) {
  let sum = 0;
  for (const key in mem) {
    sum += mem[key];
  }
  return sum;
}

export function solvePart1(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const mem: Memory = {};
  let currentMask = "";
  lines.forEach((line) => {
    if (line.startsWith("mask")) {
      currentMask = line.substr(7);
    } else {
      const [, address, value] = line.match(/^mem\[(\d+)\].=.(\d+)$/);
      const valueAfterMask = applyMask(parseInt(value), currentMask);
      mem[address] = valueAfterMask;
    }
  });
  return sum(mem);
}

function getAllMaskes(mask: string): string[] {
  if (mask.indexOf("X") === -1) return [mask];
  const m0 = mask.replace("X", "0");
  const m1 = mask.replace("X", "1");
  return getAllMaskes(m0).concat(getAllMaskes(m1));
}

export function getAddresses(address: number, mask: string) {
  const maskAllAt1 = mask.replace(/X/g, "1");
  const addressAllAt1 = or(address, parseInt(maskAllAt1, 2));
  const allMask = getAllMaskes(mask.replace(/0/g, "1"));
  return allMask.map((mask) => {
    return and(addressAllAt1, parseInt(mask, 2));
  });
}

export function solvePart2(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const mem: Memory = {};
  let currentMask = "";
  lines.forEach((line) => {
    if (line.startsWith("mask")) {
      currentMask = line.substr(7);
    } else {
      const [, address, valueStr] = line.match(/^mem\[(\d+)\].=.(\d+)$/);
      const value = parseInt(valueStr);
      const addresses = getAddresses(parseInt(address), currentMask);
      addresses.forEach((address) => {
        mem[address] = value;
      });
    }
  });
  return sum(mem);
}

if (require.main === module) {
  console.log(
    "Day14 - Part 1 : answer is : " + solvePart1("day14/data/mydata")
  );
  console.log(
    "Day14 - Part 2 : answer is : " + solvePart2("day14/data/mydata")
  );
}

// value   =        1011000110011111111001010100
// mask    =0X1010X11110101X011000X0000000111001
// expected=  1010011110101101100010000000111001
// res     =    -1100001010010011101111111000111

// maskAnd = 11010111110101101100010000000111001
// maskOr  =  1010011110101001100000000000111001
