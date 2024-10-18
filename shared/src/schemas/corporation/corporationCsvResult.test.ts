import { PDF_BASE64_TEST_VALUE } from '@shared/consts/base64ForUT';
import { corporationCsvResultSchema } from '@shared/schemas/corporation/corporationCsvResult';

describe('corporationCsvResult', () => {
  const validTestValue = {
    file: PDF_BASE64_TEST_VALUE,
    fileName: 'fileName',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationCsvResultSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        // file: PDF_BASE64,
        fileName: 'fileName',
      };
      expect(() => corporationCsvResultSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, file: 'invalid' };
      expect(() => corporationCsvResultSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('fileName', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationCsvResultSchema.parse(validTestValue)).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationCsvResultSchema.parse(123)).toThrow();
        expect(() => corporationCsvResultSchema.parse(null)).toThrow();
        expect(() => corporationCsvResultSchema.parse(undefined)).toThrow();
      });
    });
    describe('最大値、最小値が正しいか', () => {
      const character = 'a';
      const gte1FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(1) };
      const lte0FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(0) };
      const lte300FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(300) };
      const gte301FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(301) };
      it('文字数が1文字以上の場合、エラーとならないこと', () => {
        expect(() => corporationCsvResultSchema.parse(gte1FileNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が0文字以下の場合、エラーとなること', () => {
        expect(() => corporationCsvResultSchema.parse(lte0FileNameCharacterTestValue)).toThrow();
      });
      it('文字数が300文字以下の場合、エラーとならないこと', () => {
        expect(() => corporationCsvResultSchema.parse(lte300FileNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が301文字以上の場合、エラーとなること', () => {
        expect(() => corporationCsvResultSchema.parse(gte301FileNameCharacterTestValue)).toThrow();
      });
    });
  });
});
