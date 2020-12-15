interface Memory {
  [key: number]: number[];
}

export function solvePart1(numbersStr: string, limit: number): number {
  const numbers = numbersStr.split(",").map((s) => parseInt(s));
  const mem: Memory = {};
  let lastValue = undefined;
  const allValues = [];
  for (let turn = 1; turn <= limit; turn++) {
    if (turn % 1000 === 0) {
      console.log(`${(turn * 100) / limit} %`);
    }
    let value = undefined;
    if (turn - 1 < numbers.length) {
      value = numbers[turn - 1];
    } else if (mem[lastValue].length === 1) {
      value = 0;
    } else {
      const values = mem[lastValue];
      value = values[values.length - 1] - values[values.length - 2];
    }
    if (mem[value] === undefined) {
      mem[value] = [turn];
    } else {
      mem[value] = [mem[value][mem[value].length - 1], turn];
    }
    lastValue = value;
    allValues.push(value);
  }
  return lastValue;
}

if (require.main === module) {
  console.log(
    "Day15 - Part 1 : answer is : " + solvePart1("0,13,1,8,6,15", 2020)
  );
  console.log(
    "Day15 - Part 2 : answer is : " + solvePart1("0,13,1,8,6,15", 30000000)
  );
}
