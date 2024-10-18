import { mailAddressSchema } from '@shared/schemas/mailAddress';

describe('mailAddress', () => {
  describe('データ型が正しいか', () => {
    it('string型である場合、エラーとならないこと', () => {
      expect(() => mailAddressSchema.parse('test@example.com')).not.toThrow();
    });
    it('string型でない場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse(1234567890)).toThrow();
    });
  });

  describe('前後の余白を無視するか', () => {
    it('前後に余白がある場合、エラーとならないこと', () => {
      expect(() => mailAddressSchema.parse(' test@example.com')).not.toThrow();
      expect(() => mailAddressSchema.parse('test@example.com ')).not.toThrow();
      expect(() => mailAddressSchema.parse(' test@example.com ')).not.toThrow();
    });
    it('中間に余白がある場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse('test @example.com')).toThrow();
      expect(() => mailAddressSchema.parse('test@examp le.com')).toThrow();
    });
  });

  describe('全角文字が含まれる場合にエラーとなるか', () => {
    it('全角文字が含まれる場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse('ｔｅｓｔ＠ｅｘａｍｐｌｅ．ｃｏｍ')).toThrow();
      expect(() => mailAddressSchema.parse('ｔest@example.com')).toThrow();
      expect(() => mailAddressSchema.parse('あいうえお@example.com')).toThrow();
    });
  });

  describe('不正なメールアドレス形式でないこと', () => {
    it('@が複数ある場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse('test@example@test.com')).toThrow();
    });
    it('@がない場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse('test.example.com')).toThrow();
    });
    it('@以降（ドメイン部）に.以外の記号がある場合、エラーとなること', () => {
      expect(() => mailAddressSchema.parse('test@example.co/jp')).toThrow();
      expect(() => mailAddressSchema.parse('test@example.co_jp')).toThrow();
    });
  });
});
