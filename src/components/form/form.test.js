import { generateFee, generateBalance, substractFromBalance, validateBalance } from './form.services';

test('Generate Fee', () => {
    expect(parseFloat(generateFee())).toBeGreaterThan(0);
    expect(parseFloat(generateFee())).toBeLessThan(0.0003);
})

test('Generate Balance', () => {
    expect(parseFloat(generateBalance())).toBeGreaterThan(0);
    expect(parseFloat(generateBalance())).toBeLessThan(200000);
})

test('Balance Substraction', () => {
    expect(parseFloat(substractFromBalance(2000, 0.0001, 1000))).toBe(999.9999);
})

test('validate Balance', () => {
    expect(validateBalance(2000, 0.0001, 1000)).toBe(true);
    expect(validateBalance(1000, 0.0001, 1000)).toBe(false);
})

