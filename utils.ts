import * as fs from 'fs';

export function readNumbersFromInputFile(filename: string) {
    const content = fs.readFileSync(filename, 'utf-8')
    return content.split('\n').filter(s => s.trim().length > 0).map(s => parseInt(s))
}
