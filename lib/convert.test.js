const convert = require('./convert');

test('converts price 4 and amount 4', () => {
  expect(convert.convert(4, 4)).toBe(16);
})

test('converts price 0 and amount 4', () => {
  expect(convert.convert(0, 4)).toBe(0);
})

test('toMoney converts float', () => {
  expect(convert.toMoney(2)).toBe('2.00');
})

test('toMoney converts string to float', () => {
  expect(convert.toMoney('2')).toBe('2.00');
})
