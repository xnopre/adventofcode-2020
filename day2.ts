import {readLinesFromInputFile} from './utils';

function isValid(line) {
    const [,minStr,maxStr,letter, password] = /^(\d+)-(\d+)\s(\w):\s(\w+)/.exec(line);
    const min = parseInt(minStr)
    const max = parseInt(maxStr)
    const count = password.split('').filter(c => c === letter).length
    return count >= min && count  <= max;
}

export function solveDay2Part1(filename: string): number {
    const lines = readLinesFromInputFile(filename);
    return lines.filter(isValid).length;
}

if (require.main === module) {
    console.log("Day2 - Part 1 : answer is : " + solveDay2Part1('data/day2.mydata'))
}
