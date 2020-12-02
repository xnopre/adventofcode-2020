import {solveDay1Part1, solveDay1Part2} from './day1';

describe('My solver', () => {
    it('solve day 1', () => {
        expect(solveDay1Part1('data/day1.sample')).toEqual(514579);
        expect(solveDay1Part2('data/day1.sample')).toEqual(241861950);
    });
});
