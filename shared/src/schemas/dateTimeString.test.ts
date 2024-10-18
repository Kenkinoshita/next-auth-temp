import { dateTimeStringSchema } from '@shared/schemas/dateTimeString';

describe('dateString', () => {
  describe('データ型が正しいか', () => {
    it('日付形式がyyyy-MM-dd HH:mm:ssで、存在する日付の場合、エラーとならないこと', () => {
      expect(() => dateTimeStringSchema.parse('1996-12-31 00:00:00')).not.toThrow();
      expect(() => dateTimeStringSchema.parse('1996-12-31 12:12:12')).not.toThrow();
    });
    it('日付形式がyyyy-MM-dd HH:mm:ssで、存在しない日付の場合、エラーとなること', () => {
      expect(() => dateTimeStringSchema.parse('1996-13-01 12:12:12')).toThrow();
      expect(() => dateTimeStringSchema.parse('1996-12-01 12:61:12')).toThrow();
    });
    it('yyyy-MM-dd HH:mm:ssを満たしていない文字列の場合、エラーとなること', () => {
      expect(() => dateTimeStringSchema.parse('hoge')).toThrow();
    });
    it('日付形式がyyyy/MM/dd  HH:mm:ssの場合、エラーとなること', () => {
      expect(() => dateTimeStringSchema.parse('2024/12/31 12:12:12')).toThrow();
    });
    it('数値が入力された場合、エラーとなること', () => {
      expect(() => dateTimeStringSchema.parse(123)).toThrow();
    });
  });
});
