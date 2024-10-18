import { dateStringSchema } from '@shared/schemas/dateString';

describe('dateString', () => {
  describe('データ型が正しいか', () => {
    it('日付形式がyyyy-MM-ddで、存在する日付の場合、エラーとならないこと', () => {
      expect(() => dateStringSchema.parse('1996-12-31')).not.toThrow();
    });
    it('日付形式がyyyy-MM-ddで、存在しない日付の場合、エラーとなること', () => {
      expect(() => dateStringSchema.parse('1996-13-01')).toThrow();
    });
    it('yyyy-MM-ddを満たしていない文字列の場合、エラーとなること', () => {
      expect(() => dateStringSchema.parse('okamoto')).toThrow();
    });
    it('日付形式がyyyy/MM/ddの場合、エラーとなること', () => {
      expect(() => dateStringSchema.parse('2024/12/31')).toThrow();
    });
    it('数値が入力された場合、エラーとなること', () => {
      expect(() => dateStringSchema.parse(123)).toThrow();
    });
  });
});
