import { flagSchema } from '@shared/schemas/flag';

describe('flagSchema', () => {
  it('期待される値が入力された場合、エラーとならないこと', () => {
    expect(() => flagSchema.parse('true')).not.toThrow();
    expect(() => flagSchema.parse('false')).not.toThrow();
  });
  it('入力した値が正しく変換されること', () => {
    const actualTrue = flagSchema.parse('true');
    const actualFalse = flagSchema.parse('false');

    expect(actualTrue).toEqual(true);
    expect(actualFalse).toEqual(false);
  });
  it('何も入力されなかった場合、エラーとなること', () => {
    expect(() => flagSchema.parse('')).toThrow();
  });
  it('期待される値以外が入力された場合、エラーとなること', () => {
    expect(() => flagSchema.parse(true)).toThrow();
    expect(() => flagSchema.parse(false)).toThrow();
    expect(() => flagSchema.parse('abc')).toThrow();
    expect(() => flagSchema.parse(null)).toThrow();
    expect(() => flagSchema.parse(undefined)).toThrow();
    expect(() => flagSchema.parse(['true', 'false'])).toThrow();
  });
});
