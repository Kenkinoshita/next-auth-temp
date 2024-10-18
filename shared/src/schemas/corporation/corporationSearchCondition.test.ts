import { corporationSearchConditionSchema } from '@shared/schemas/corporation/corporationSearchCondition';

describe('corporationSearchCondition', () => {
  const validTestValue = {
    cic: '1234567890',
    name: 'auじぶん銀行',
    kana: 'エーユージブンギンコウ',
    feeBillingMethods: ['partial', 'partialWithoutCic'],
    balanceStatementIssuingBankMonth: 'none',
    balanceStatementIssuingAuditingFirmMonth: 'jan',
    transactionStatementIssuingMonth: 'feb',
    cancellationDate: 'uncancelled',
    page: '1',
    size: '20',
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationSearchConditionSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        cic: '1234567890',
        name: 'auじぶん銀行',
        kana: 'エーユージブンギンコウ',
        balanceStatementIssuingBankMonth: 'none',
        balanceStatementIssuingAuditingFirmMonth: 'jan',
        transactionStatementIssuingMonth: 'feb',
        cancellationDate: 'uncancelled',
        page: '1',
        size: '20',
      };
      expect(() => corporationSearchConditionSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, feeBillingMethods: ['invalid'] };
      expect(() => corporationSearchConditionSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('cicを空欄もしくはスペースのみで入力した場合、正しく判定するか', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, cic: '' })).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, cic: null })).toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, cic: undefined })).toThrow();
      });
    });

    describe('スペースを正しく判定するか', () => {
      it('スペースのみを入力した場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, cic: '   ' })).not.toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, cic: '　　　' })).not.toThrow();
      });
    });
  });

  describe('nameを空欄もしくはスペースのみで入力した場合、正しく判定されるか', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, name: '' })).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, name: null })).toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, name: undefined })).toThrow();
      });
    });

    describe('スペースを正しく判定するか', () => {
      it('スペースのみを入力した場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, name: '   ' })).not.toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, name: '　　　' })).not.toThrow();
      });
    });
  });

  describe('kanaを空欄もしくはスペースのみで入力した場合、正しく判定されるか', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, kana: '' })).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, kana: null })).toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, kana: undefined })).toThrow();
      });
    });

    describe('スペースを正しく判定するか', () => {
      it('スペースのみを入力した場合、エラーとならないこと', () => {
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, kana: '   ' })).not.toThrow();
        expect(() => corporationSearchConditionSchema.parse({ ...validTestValue, kana: '　　　' })).not.toThrow();
      });
    });
  });
});
