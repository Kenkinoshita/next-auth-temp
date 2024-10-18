import { monthSchema } from '@shared/schemas/month';

describe('month', () => {
  it('期待される値が入力された場合、エラーとならないこと', () => {
    expect(() => monthSchema.parse('jan')).not.toThrow();
    expect(() => monthSchema.parse('feb')).not.toThrow();
    expect(() => monthSchema.parse('mar')).not.toThrow();
    expect(() => monthSchema.parse('apr')).not.toThrow();
    expect(() => monthSchema.parse('may')).not.toThrow();
    expect(() => monthSchema.parse('jun')).not.toThrow();
    expect(() => monthSchema.parse('jul')).not.toThrow();
    expect(() => monthSchema.parse('aug')).not.toThrow();
    expect(() => monthSchema.parse('sep')).not.toThrow();
    expect(() => monthSchema.parse('oct')).not.toThrow();
    expect(() => monthSchema.parse('nov')).not.toThrow();
    expect(() => monthSchema.parse('dec')).not.toThrow();
  });
  it('何も入力されなかった場合、エラーとなること', () => {
    expect(() => monthSchema.parse('')).toThrow();
  });
  it('期待される値以外が入力された場合、エラーとなること', () => {
    expect(() => monthSchema.parse('abc')).toThrow();
    expect(() => monthSchema.parse(null)).toThrow();
    expect(() => monthSchema.parse(undefined)).toThrow();
    expect(() => monthSchema.parse(['jan', 'feb'])).toThrow();
  });
});
