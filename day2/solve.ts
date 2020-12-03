import {readLinesFromInputFile} from '../utils';

function isValidPart1(line) {
    const [, minStr, maxStr, letter, password] = /^(\d+)-(\d+)\s(\w):\s(\w+)/.exec(line);
    const min = parseInt(minStr)
    const max = parseInt(maxStr)
    const count = password.split('').filter(c => c === letter).length
    return count >= min && count <= max;
}

export function solvePart1(filename: string): number {
    const lines = readLinesFromInputFile(filename);
    return lines.filter(isValidPart1).length;
}

function isValidPart2(line) {
    const [, pos1Str, pos2Str, letter, password] = /^(\d+)-(\d+)\s(\w):\s(\w+)/.exec(line);
    const pos1 = parseInt(pos1Str)
    const pos2 = parseInt(pos2Str)
    const ok1 = password.charAt(pos1 - 1) === letter
    const ok2 = password.charAt(pos2 - 1) === letter
    return ok1 !== ok2;
}

export function solvePart2(filename: string): number {
    const lines = readLinesFromInputFile(filename);
    return lines.filter(isValidPart2).length;
}

if (require.main === module) {
    console.log("Day2 - Part 1 : answer is : " + solvePart1('day2/data/mydata'))
    console.log("Day2 - Part 2 : answer is : " + solvePart2('day2/data/mydata'))
}
