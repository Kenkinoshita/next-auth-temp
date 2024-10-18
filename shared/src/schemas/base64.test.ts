import { PDF_BASE64_TEST_VALUE } from '@shared/consts/base64ForUT';
import { base64Schema } from '@shared/schemas/base64';

describe('base64', () => {
  describe('データ型が正しいか', () => {
    it('string型でない場合、エラーとなること', () => {
      expect(() => base64Schema.parse(1234567890)).toThrow();
    });
  });

  describe('形式が正しいか', () => {
    it('正しい形式のbase64文字列が入力された場合、エラーとならないこと', () => {
      expect(() => base64Schema.parse(PDF_BASE64_TEST_VALUE)).not.toThrow();
    });
    it('base64文字列の形式を満たさない文字列が入力された場合、エラーとなること', () => {
      expect(() => base64Schema.parse('123456789')).toThrow();
    });
    it('空文字が入力された場合、エラーとなること', () => {
      expect(() => base64Schema.parse('')).toThrow();
    });
  });
});
