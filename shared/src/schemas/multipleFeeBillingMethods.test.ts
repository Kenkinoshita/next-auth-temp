import { multipleFeeBillingMethodsSchema } from '@shared/schemas/multipleFeeBillingMethods';

describe('multipleFeeBillingMethods', () => {
  it('期待される値が入力された場合、エラーとならないこと', () => {
    expect(() => multipleFeeBillingMethodsSchema.parse(['partial'])).not.toThrow();
    expect(() =>
      multipleFeeBillingMethodsSchema.parse(['partial', 'partialWithoutCic', 'totalIndividually', 'total']),
    ).not.toThrow();
    expect(() => multipleFeeBillingMethodsSchema.parse(['partialWithoutCic', 'partial'])).not.toThrow();
  });
  it('何も入力されなかった場合、エラーとならないこと', () => {
    expect(() => multipleFeeBillingMethodsSchema.parse([])).not.toThrow();
  });
  it('期待される値以外が入力された場合、エラーとなること', () => {
    expect(() => multipleFeeBillingMethodsSchema.parse('partial')).toThrow();
    expect(() => multipleFeeBillingMethodsSchema.parse(['abc'])).toThrow();
    expect(() => multipleFeeBillingMethodsSchema.parse([null])).toThrow();
    expect(() => multipleFeeBillingMethodsSchema.parse([undefined])).toThrow();
  });
});
