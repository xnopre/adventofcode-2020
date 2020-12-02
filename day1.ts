import * as fs from 'fs';


function readNumbersFromInputFile(filename: string) {
    const content = fs.readFileSync(filename, 'utf-8')
    return content.split('\n').map(s => parseInt(s))
}

export function solveDay1(filename: string): number {
    const numbers = readNumbersFromInputFile(filename)
    for(let i = 0; i < numbers.length; i++) {
        for(let j=i; j < numbers.length; j++) {
            if (numbers[i]+numbers[j] == 2020) {
                return numbers[i]*numbers[j];
            }
        }
    }
    return 0
}

console.log(solveDay1('data/day1.mydata'))
