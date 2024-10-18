import { postalCodeSchema } from '@shared/schemas/postalCode';

describe('postalCode', () => {
  it('形式が不正の場合、エラーを返却', () => {
    expect(() => postalCodeSchema.parse('1111111')).not.toThrow();
    expect(() => postalCodeSchema.parse('111111')).toThrow();
    expect(() => postalCodeSchema.parse('11111111')).toThrow();
    expect(() => postalCodeSchema.parse('111a111')).toThrow();
  });
  it('前後に余白がある場合、余白を無視する', () => {
    expect(() => postalCodeSchema.parse(' 1111111')).not.toThrow();
    expect(() => postalCodeSchema.parse(' 1111111 ')).not.toThrow();
    expect(() => postalCodeSchema.parse('1111111 ')).not.toThrow();
    expect(() => postalCodeSchema.parse('111 1111')).toThrow();
  });
});
