import { PDF_BASE64_TEST_VALUE } from '@shared/consts/base64ForUT';
import { ledgerPDFSearchResultSchema } from '@shared/schemas/ledger/inquiry/ledgerPDFSearchResult';

describe('ledgerPDFSearchResult', () => {
  const validTestValue = {
    pdfData: PDF_BASE64_TEST_VALUE,
    fileName: 'fileName',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => ledgerPDFSearchResultSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        // pdfData: PDF_BASE64_TEST_VALUE,
        fileName: 'fileName',
      };
      expect(() => ledgerPDFSearchResultSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, pdfData: 'invalid' };
      expect(() => ledgerPDFSearchResultSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('fileName', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => ledgerPDFSearchResultSchema.parse(validTestValue)).not.toThrow();
        expect(() => ledgerPDFSearchResultSchema.parse({ ...validTestValue, fileName: '123' })).not.toThrow();
        expect(() =>
          ledgerPDFSearchResultSchema.parse({ ...validTestValue, fileName: 123 + 'fileName' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => ledgerPDFSearchResultSchema.parse({ ...validTestValue, fileName: 123 })).toThrow();
        expect(() => ledgerPDFSearchResultSchema.parse({ ...validTestValue, fileName: null })).toThrow();
        expect(() => ledgerPDFSearchResultSchema.parse({ ...validTestValue, fileName: undefined })).toThrow();
      });
    });

    describe('文字数が正しいか', () => {
      const character = 'a';
      const gte1fileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(1) };
      const lte0FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(0) };
      const lte300FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(300) };
      const gte300FileNameCharacterTestValue = { ...validTestValue, fileName: character.repeat(301) };

      it('文字数が1文字以上である場合、エラーとならないこと', () => {
        expect(() => ledgerPDFSearchResultSchema.parse(gte1fileNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が0文字以下である場合、エラーとなること', () => {
        expect(() => ledgerPDFSearchResultSchema.parse(lte0FileNameCharacterTestValue)).toThrow();
      });
      it('文字数が300文字以下である場合、エラーとならないこと', () => {
        expect(() => ledgerPDFSearchResultSchema.parse(lte300FileNameCharacterTestValue)).not.toThrow();
      });
      it('文字数が301文字以上である場合、エラーとなること', () => {
        expect(() => ledgerPDFSearchResultSchema.parse(gte300FileNameCharacterTestValue)).toThrow();
      });
    });
  });
});
