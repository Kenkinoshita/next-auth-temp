import { versionSchema } from '@shared/schemas/version';

describe('versionSchema', () => {
  describe('データ型が正しいか', () => {
    it('number型である場合、エラーとならないこと', () => {
      expect(() => versionSchema.parse(50)).not.toThrow();
    });
    it('number型でない場合、エラーとなること', () => {
      expect(() => versionSchema.parse('invalid')).toThrow();
      expect(() => versionSchema.parse('50')).toThrow();
      expect(() => versionSchema.parse(null)).toThrow();
      expect(() => versionSchema.parse(undefined)).toThrow();
    });
  });
  describe('最大値、最小値が正しいか', () => {
    it('値が1以上の場合、エラーとならないこと', () => {
      expect(() => versionSchema.parse(1)).not.toThrow();
    });
    it('値が0以下の場合、エラーとなること', () => {
      expect(() => versionSchema.parse(0)).toThrow();
    });
    it('値が99以下の場合、エラーとならないこと', () => {
      expect(() => versionSchema.parse(99)).not.toThrow();
    });
    it('値が100以上の場合、エラーとなること', () => {
      expect(() => versionSchema.parse(100)).toThrow();
    });
  });
  describe('数値が整数か', () => {
    it('整数である場合、エラーとならないこと', () => {
      expect(() => versionSchema.parse(50)).not.toThrow();
    });
    it('整数でない場合、エラーとなること', () => {
      expect(() => versionSchema.parse(50.1)).toThrow();
    });
  });
});
