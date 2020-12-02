import {readNumbersFromInputFile} from './utils';


function findNumbersFrom(numbers: number[], expectedSum: number, numbersCount: number, startIndex: number) {
    function noMoreDataToSearch() {
        return numbersCount === 0 || startIndex >= numbers.length;
    }
    function isTheLastOneNumberExpected(currentNumber: number) {
        return currentNumber === expectedSum && numbersCount === 1;
    }
    function thereResultIsNotEmpty(others: number[]) {
        return others.length != 0;
    }

    if (noMoreDataToSearch()) return []
    for(let i = startIndex; i < numbers.length; i++) {
        const currentNumber = numbers[i];
        if (isTheLastOneNumberExpected(currentNumber)) {
            return [currentNumber]
        }
        const others = findNumbersFrom(numbers, expectedSum-currentNumber, numbersCount-1, i+1)
        if (thereResultIsNotEmpty(others)) {
            return [currentNumber].concat(others)
        }
    }
    return []
}

function findNumbers(inputNumbers: number[], expectedSum: number, numbersCount: number) {
    return findNumbersFrom(inputNumbers, expectedSum, numbersCount, 0)
}

function multiplicateAll(resultNumbers: number[]) {
    return resultNumbers.reduce((acc, val) => acc * val, 1);
}

function solveDay1(filename: string, numbersCount: number) {
    const inputNumbers = readNumbersFromInputFile(filename)
    const resultNumbers = findNumbers(inputNumbers, 2020, numbersCount);
    return multiplicateAll(resultNumbers)
}

export function solveDay1Part1(filename: string): number {
    return solveDay1(filename, 2);
}

export function solveDay1Part2(filename: string): number {
    return solveDay1(filename, 3);
}

if (require.main === module) {
    console.log("Day1 - Part 1 : answer is : " + solveDay1Part1('data/day1.mydata'))
    console.log("Day1 - Part 2 : answer is : " + solveDay1Part2('data/day1.mydata'))
}
