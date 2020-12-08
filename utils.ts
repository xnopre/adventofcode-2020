import * as fs from "fs";

export function readNumbersFromInputFile(filename: string) {
  return readLinesFromInputFile(filename).map((s) => parseInt(s));
}

export function readLinesFromInputFile(filename: string) {
  const content = fs.readFileSync(filename, "utf-8");
  return content.split("\n").filter((s) => s.trim().length > 0);
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
