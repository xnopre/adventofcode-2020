import * as fs from "fs";

export function readNumbersFromInputFile(filename: string) {
  return readLinesFromInputFile(filename).map((s) => parseInt(s));
}

export function readLinesFromInputFile(
  filename: string,
  filterEmptyLines = true
) {
  const content = fs.readFileSync(filename, "utf-8");
  let lines = content.split("\n");
  if (filterEmptyLines) lines = lines.filter((s) => s.trim().length > 0);
  return lines;
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
