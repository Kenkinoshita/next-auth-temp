import { pageNumberSchema } from '@shared/schemas/pageNumber';

describe('PageNumberSchema', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => pageNumberSchema.parse('5')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => pageNumberSchema.parse(5)).toThrow();
    });
  });

  describe('最小値が正しいか', () => {
    it('値が1以上の場合、エラーとならないこと', () => {
      expect(() => pageNumberSchema.parse('1')).not.toThrow();
    });
    it('値が0以下の場合、エラーとなること', () => {
      expect(() => pageNumberSchema.parse('0')).toThrow();
    });
  });
});
