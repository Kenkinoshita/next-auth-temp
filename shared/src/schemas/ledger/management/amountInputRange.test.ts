import { amountInputRangeSchema } from '@shared/schemas/ledger/management/amountInputRange';

describe('amountInputRangeSchema', () => {
  describe('データ型が正しいか', () => {
    it('string型の数値である場合、エラーとならないこと', () => {
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: '5001' })).not.toThrow();
    });
    it('string型の整数値でない場合、エラーとなること', () => {
      expect(() => amountInputRangeSchema.parse({ min: 5000, max: '5001' })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: 5001 })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: 'abc', max: 'abc' })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: undefined, max: undefined })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: null, max: null })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: '5000.1', max: '5001' })).toThrow();
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: '5000.1' })).toThrow();
    });
  });

  const maxValue = 9_999_999_999;
  const overMaxValue = 10_000_000_000;

  describe('最大値・最小値が正しいか', () => {
    it('最大値が、9,999,999,999であること', () => {
      expect(() => amountInputRangeSchema.parse({ min: maxValue.toString(), max: maxValue.toString() })).not.toThrow();
      expect(() =>
        amountInputRangeSchema.parse({ min: overMaxValue.toString(), max: overMaxValue.toString() }),
      ).toThrow();
    });
    it('最少が、0であること', () => {
      expect(() => amountInputRangeSchema.parse({ min: '0', max: '0' })).not.toThrow();
      expect(() => amountInputRangeSchema.parse({ min: '-1', max: '-1' })).toThrow();
    });
  });

  describe('下限値と上限値の大小関係', () => {
    it('下限値が上限値より大きい場合、エラーとなること', () => {
      expect(() => amountInputRangeSchema.parse({ min: '5001', max: '5000' })).toThrow();
    });
    it('下限値が上限値より小さい場合、エラーとならないこと', () => {
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: '5001' })).not.toThrow();
    });
    it('下限値と上限値が等しい場合、エラーとならないこと', () => {
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: '5000' })).not.toThrow();
    });
  });

  describe('下限値または上限値に空文字が含まれる場合', () => {
    it('下限値と上限値のどちらかが空文字の場合、エラーとならないこと', () => {
      expect(() => amountInputRangeSchema.parse({ min: '', max: '5000' })).not.toThrow();
      expect(() => amountInputRangeSchema.parse({ min: '5000', max: '' })).not.toThrow();
    });
    it('下限値と上限値の両方に空文字が含まれる場合、エラーとならないこと', () => {
      expect(() => amountInputRangeSchema.parse({ min: '', max: '' })).not.toThrow();
    });
  });
});
