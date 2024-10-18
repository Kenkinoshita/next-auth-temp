import { ledgerManagementDetailSummarySchema } from '@shared/schemas/ledger/management/ledgerManagementDetailSummary';

describe('ledgerManagementDetailSummary', () => {
  const validTestValue = {
    no: 5,
    version: 1,
    createdDateTime: '1996-12-31 00:00:00',
    isInvalidStatus: 'true',
    isDownloaded: 'true',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => ledgerManagementDetailSummarySchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        no: 5,
        // version: 1,
        createdDateTime: '1996-12-31 00:00:00',
        isInvalidStatus: 'true',
        isDownloaded: 'true',
      };
      expect(() => ledgerManagementDetailSummarySchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, version: 'invalid' };
      expect(() => ledgerManagementDetailSummarySchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('no', () => {
    describe('データ型が正しいか', () => {
      it('number型である場合、エラーとならないこと', () => {
        expect(() => ledgerManagementDetailSummarySchema.parse(validTestValue)).not.toThrow();
      });
      it('number型でない場合、エラーとなること', () => {
        expect(() => ledgerManagementDetailSummarySchema.parse({ ...validTestValue, no: '5' })).toThrow();
        expect(() => ledgerManagementDetailSummarySchema.parse({ ...validTestValue, no: null })).toThrow();
        expect(() => ledgerManagementDetailSummarySchema.parse({ ...validTestValue, no: undefined })).toThrow();
      });
    });

    describe('最小値が正しいか', () => {
      it('数値が1以上である場合、エラーとならないこと', () => {
        expect(() => ledgerManagementDetailSummarySchema.parse({ ...validTestValue, no: 1 })).not.toThrow();
      });
      it('数値が0以下である場合、エラーとなること', () => {
        expect(() => ledgerManagementDetailSummarySchema.parse({ ...validTestValue, no: 0 })).toThrow();
      });
    });
  });
});
