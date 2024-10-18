import { corporationSummarySchema } from '@shared/schemas/corporation/corporationSummary';

describe('corporationSummary', () => {
  const validTestValue = {
    no: 5,
    cic: '1234567890',
    name: 'auじぶん銀行',
    kana: 'エーユージブンギンコウ',
    balanceStatementIssuingBankMonths: ['jan', 'feb'],
    balanceStatementIssuingAuditingFirmMonths: ['jan', 'feb'],
    transactionStatementIssuingMonths: ['jan', 'feb'],
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationSummarySchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        no: 0,
        name: 'auじぶん銀行',
        kana: 'エーユージブンギンコウ',
        balanceStatementIssuingBankMonths: ['jan', 'feb'],
        balanceStatementIssuingAuditingFirmMonths: ['jan', 'feb'],
        transactionStatementIssuingMonths: ['jan', 'feb'],
      };
      expect(() => corporationSummarySchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, cic: 'invalid' };
      expect(() => corporationSummarySchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('no', () => {
    describe('データ型が正しいか', () => {
      it('number型である場合、エラーとならないこと', () => {
        expect(() => corporationSummarySchema.parse(validTestValue)).not.toThrow();
      });
      it('number型でない場合、エラーとなること', () => {
        expect(() => corporationSummarySchema.parse({ ...validTestValue, no: '5' })).toThrow();
        expect(() => corporationSummarySchema.parse({ ...validTestValue, no: null })).toThrow();
        expect(() => corporationSummarySchema.parse({ ...validTestValue, no: undefined })).toThrow();
      });
    });
    describe('最小値が正しいか', () => {
      it('値が1以上の場合、エラーとならないこと', () => {
        expect(() => corporationSummarySchema.parse({ ...validTestValue, no: 1 })).not.toThrow();
      });
      it('値が0の場合、エラーとなること', () => {
        expect(() => corporationSummarySchema.parse({ ...validTestValue, no: 0 })).toThrow();
      });
    });
  });
});
