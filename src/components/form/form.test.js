import { generateFee, generateBalance } from './form.services';

test('Generate Fee', () => {
    expect(parseFloat(generateFee())).toBeGreaterThan(0);
    expect(parseFloat(generateFee())).toBeLessThan(0.0003);
})

test('Generate Balance', () => {
    expect(parseFloat(generateBalance())).toBeGreaterThan(0);
    expect(parseFloat(generateBalance())).toBeLessThan(200000);
})

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });