import {formatCurrency} from '../../scripts/utils/money.js';

//create test suite
describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  }); // test case for currency formatting

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  })
});