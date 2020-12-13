import { readLinesFromInputFile } from "../utils";

function readDataPart1(filename: string) {
  const lines = readLinesFromInputFile(filename);
  const timeToStart = parseInt(lines[0]);
  const busIds = lines[1]
    .split(",")
    .filter((s) => s !== "x")
    .map((s) => parseInt(s));
  return { timeToStart, busIds };
}

interface BusAndTimeToWait {
  id: number;
  min: number;
}

export function findBusWithMinTimeToWait(
  busIds: number[],
  timeToStart: number
): BusAndTimeToWait {
  const acc: BusAndTimeToWait = { id: undefined, min: undefined };
  const res = busIds
    .map((busId) => {
      return { id: busId, timeToWait: busId - (timeToStart % busId) };
    })
    .reduce((acc, data) => {
      if (acc.id === undefined) {
        return { id: data.id, min: data.timeToWait };
      }
      if (data.timeToWait < acc.min) {
        return { id: data.id, min: data.timeToWait };
      }
      return acc;
    }, acc);
  return res;
}

export function solvePart1(filename: string): number {
  const { timeToStart, busIds } = readDataPart1(filename);
  const res = findBusWithMinTimeToWait(busIds, timeToStart);
  return res.id * res.min;
}

interface Bus2 {
  id: number;
  delta: number;
}

function convert(busIdsAsStr: string): Bus2[] {
  const busIds = busIdsAsStr.split(",");
  const data = busIds
    .map((s, index) => {
      if (s === "x") {
        return undefined;
      }
      const bus: Bus2 = {
        id: parseInt(s),
        delta: index,
      };
      return bus;
    })
    .filter((item) => item !== undefined);
  return data;
}

function getDelta(bus: Bus2, time: number) {
  let delta = bus.id - (time % bus.id);
  if (delta === bus.id) delta = 0;
  return delta;
}

function isOK(bus: Bus2, time: number): boolean {
  return (time + bus.delta) % bus.id === 0;
}

export function findT(busIdsAsStr: string) {
  let buss = convert(busIdsAsStr);
  let increment = buss[0].id;
  buss = buss.splice(1);
  for (let time = increment; ; time += increment) {
    const bus = buss[0];
    const ok = isOK(bus, time);
    if (!ok) {
      continue;
    }
    if (buss.length === 1) {
      return time;
    }
    increment *= bus.id;
    buss = buss.splice(1);
  }
  return 0;
}

export function solvePart2(filename: string): number {
  const lines = readLinesFromInputFile(filename);
  const busIdsAsStr = lines[1];
  return findT(busIdsAsStr);
}

if (require.main === module) {
  console.log(
    "Day13 - Part 1 : answer is : " + solvePart1("day13/data/mydata")
  );
  console.log(
    "Day13 - Part 2 : answer is : " + solvePart2("day13/data/mydata")
  );
}
