import {readLinesFromInputFile} from '../utils';

function countTree(line: string, index: number) {
    return line.charAt(index) === '#' ? 1 : 0;
}

function solve(lines: string[], start: number, right: number, down: number) {
    if (lines.length === 0) return 0;
    let [line, ...othersLines] = lines;
    let countTree1 = countTree(line, start);
    if (down == 2) {
        if (othersLines.length === 0) return countTree1;
        [line, ...othersLines] = othersLines;
    }
    const newStart = (start+right)%line.length;
    return countTree1+solve(othersLines, newStart, right, down);
}

export function solvePart1(filename: string): number {
    const lines = readLinesFromInputFile(filename);
    return solve(lines, 0, 3, 1);
}

export function solvePart2(filename: string): number {
    const lines = readLinesFromInputFile(filename);
    return solve(lines, 0, 1, 1) *
        solve(lines, 0, 3, 1) *
        solve(lines, 0, 5, 1) *
        solve(lines, 0, 7, 1) *
        solve(lines, 0, 1, 2);
}

if (require.main === module) {
    console.log("Day3 - Part 1 : answer is : " + solvePart1('day3/data/mydata'))
    console.log("Day3 - Part 2 : answer is : " + solvePart2('day3/data/mydata'))
}
