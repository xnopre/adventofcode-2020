import {solvePart1, solvePart2} from './solve';

describe('My solver', () => {
    it('solves the', () => {
        expect(solvePart1('day1/data/sample')).toEqual(514579);
        expect(solvePart2('day1/data/sample')).toEqual(241861950);
    });
});
