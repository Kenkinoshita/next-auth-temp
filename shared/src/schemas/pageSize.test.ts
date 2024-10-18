import { pageSizeSchema } from '@shared/schemas/pageSize';

describe('pageSizeSchema', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => pageSizeSchema.parse('20')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => pageSizeSchema.parse(20)).toThrow();
    });
  });

  describe('値が5の倍数になっているか', () => {
    it('5の倍数である場合、エラーとならないこと', () => {
      expect(() => pageSizeSchema.parse('20')).not.toThrow();
    });
    it('5の倍数でない場合、エラーとなること', () => {
      expect(() => pageSizeSchema.parse('26')).toThrow();
    });
  });

  describe('上限と下限が正しいか', () => {
    it('値が5以上100以下の場合、エラーとならないこと', () => {
      expect(() => pageSizeSchema.parse('5')).not.toThrow();
      expect(() => pageSizeSchema.parse('100')).not.toThrow();
    });
    it('値が0以下の場合、エラーとなること', () => {
      expect(() => pageSizeSchema.parse('0')).toThrow();
    });
    it('値が110以上の場合、エラーとなること', () => {
      expect(() => pageSizeSchema.parse('110')).toThrow();
    });
  });
});
