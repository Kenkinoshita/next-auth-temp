import { createNumericStringSchema } from '@shared/schemas/numericString';

describe('createNumericStringSchema', () => {
  describe('入力した値が正しいか', () => {
    it('string型の数値を入力した場合、エラーとならないこと', () => {
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse('123')).not.toThrow();
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse('')).not.toThrow();
    });
    it('string型の数値以外を入力した場合、エラーとなること', () => {
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse('abc')).toThrow();
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse(123)).toThrow();
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse(null)).toThrow();
      expect(() => createNumericStringSchema({ nan_error: 'message' }).parse(undefined)).toThrow();
    });
  });

  describe('返り値が正しいか', () => {
    it('string型の数値を入力した場合、number型の数値に変換して返すこと', () => {
      const testSchema = createNumericStringSchema({ nan_error: 'message' });
      const actualNumber = testSchema.parse('123');
      const actualZero = testSchema.parse('');

      expect(actualNumber).toEqual(123);
      expect(actualZero).toEqual(0);
    });
    it.todo('Number.isNanとなる文字列を引数として渡した場合、引数で指定したエラーメッセージを返すこと');
  });
});
