import { multipleMonthsSchema } from '@shared/schemas/multipleMonths';

describe('multipleMonths', () => {
  it('期待される値が入力された場合、エラーとならないこと', () => {
    expect(() => multipleMonthsSchema.parse(['jan'])).not.toThrow();
    expect(() =>
      multipleMonthsSchema.parse(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']),
    ).not.toThrow();
    expect(() => multipleMonthsSchema.parse(['feb', 'jan'])).not.toThrow();
  });
  it('何も入力されなかった場合、エラーとならないこと', () => {
    expect(() => multipleMonthsSchema.parse([])).not.toThrow();
  });
  it('期待される値以外が入力された場合、エラーとなること', () => {
    expect(() => multipleMonthsSchema.parse('jan')).toThrow();
    expect(() => multipleMonthsSchema.parse(['abc'])).toThrow();
    expect(() => multipleMonthsSchema.parse([null])).toThrow();
    expect(() => multipleMonthsSchema.parse([undefined])).toThrow();
  });
});
