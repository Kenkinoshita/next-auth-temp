import { feeBillingMethodSchema } from '@shared/schemas/feeBillingMethod';

describe('feeBillingMethod', () => {
  it('期待される値が一つ入力された場合、エラーとならないこと', () => {
    expect(() => feeBillingMethodSchema.parse('partial')).not.toThrow();
    expect(() => feeBillingMethodSchema.parse('partialWithoutCic')).not.toThrow();
    expect(() => feeBillingMethodSchema.parse('totalIndividually')).not.toThrow();
    expect(() => feeBillingMethodSchema.parse('total')).not.toThrow();
  });
  it('何も入力されなかった場合、エラーとなること', () => {
    expect(() => feeBillingMethodSchema.parse('')).toThrow();
  });
  it('期待される値ではない値が入力された場合、エラーとなること', () => {
    expect(() => feeBillingMethodSchema.parse('abc')).toThrow();
    expect(() => feeBillingMethodSchema.parse(['partial', 'partialWithoutCic'])).toThrow();
    expect(() => feeBillingMethodSchema.parse(null)).toThrow();
    expect(() => feeBillingMethodSchema.parse(undefined)).toThrow();
  });
});
