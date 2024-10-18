import { ledgerSummarySchema } from '@shared/schemas/ledger/management/ledgerSummary';

describe('management/ledgerSummary', () => {
  const validTestValue = {
    no: 2,
    cic: '1234567890',
    createdDate: '2024-10-16',
    corporationName: 'auじぶん銀行',
    documentTypeCode: 'C301',
    documentTypeName: '振込手数料引落事前通知書',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => ledgerSummarySchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        no: 2,
        // cic: '1234567890',
        createdDate: '2024-10-16',
        corporationName: 'auじぶん銀行',
        documentTypeCode: 'C301',
        documentTypeName: '振込手数料引落事前通知書',
      };
      expect(() => ledgerSummarySchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, cic: 'invalid' };
      expect(() => ledgerSummarySchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('no', () => {
    describe('データ型が正しいか', () => {
      it('number型である場合、エラーとならないこと', () => {
        expect(() => ledgerSummarySchema.parse(validTestValue)).not.toThrow();
      });
      it('number型でない場合、エラーとなること', () => {
        expect(() => ledgerSummarySchema.parse({ ...validTestValue, no: '2' })).toThrow();
        expect(() => ledgerSummarySchema.parse({ ...validTestValue, no: null })).toThrow();
        expect(() => ledgerSummarySchema.parse({ ...validTestValue, no: undefined })).toThrow();
      });
    });

    describe('最小値が正しいか', () => {
      it('値が1以上である場合、エラーとならないこと', () => {
        expect(() => ledgerSummarySchema.parse({ ...validTestValue, no: 1 })).not.toThrow();
      });
      it('値が0以下である場合、エラーとなること', () => {
        expect(() => ledgerSummarySchema.parse({ ...validTestValue, no: 0 })).toThrow();
      });
    });
  });
});
