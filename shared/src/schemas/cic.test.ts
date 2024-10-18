import { cicSchema } from '@shared/schemas/cic';

describe('cic', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => cicSchema.parse('1234567890')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => cicSchema.parse(1234567890)).toThrow();
    });
  });

  describe('前後の余白を無視するか', () => {
    it('前後に余白がある場合、エラーとならないこと', () => {
      expect(() => cicSchema.parse(' 1234567890')).not.toThrow();
      expect(() => cicSchema.parse('1234567890 ')).not.toThrow();
      expect(() => cicSchema.parse(' 1234567890 ')).not.toThrow();
    });
    it('中間に余白がある場合、エラーとなること', () => {
      expect(() => cicSchema.parse('12345 67890')).toThrow();
    });
  });

  describe('桁数が正しいか', () => {
    it('10桁である場合、エラーとならないこと', () => {
      expect(() => cicSchema.parse('1234567890')).not.toThrow();
    });
    it('10桁でない場合、エラーとなること', () => {
      expect(() => cicSchema.parse('123456789')).toThrow();
      expect(() => cicSchema.parse('12345678901')).toThrow();
    });
  });

  describe('半角数字かどうか', () => {
    it('半角数字である場合、エラーとならないこと', () => {
      expect(() => cicSchema.parse('1234567890')).not.toThrow();
    });
    it('半角数字でない場合、エラーとなること', () => {
      expect(() => cicSchema.parse('１２３４５６７８９０')).toThrow();
      expect(() => cicSchema.parse('１234567890')).toThrow();
    });
  });
});
