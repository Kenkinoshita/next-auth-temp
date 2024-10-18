import { corporationTransactionStatementSchema } from '@shared/schemas/corporation/corporationTransactionStatement';

describe('corporationTransactionStatement', () => {
  const validTestValue = {
    required: 'true',
    months: ['jan', 'feb'],
    requiredFeeNotification: 'true',
    feeBillingMethod: 'partial',
    feeAccount: {
      number: '1234567',
      branchNumber: '123',
    },
    hasFeeExemption: 'true',
    notes: 'テキスト',
  };

  const INVALID_FEE_ACCOUNT = {
    branchNumber: '123',
    number: 'invalid_value',
  };

  describe('corporationTransactionStatementSchema', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationTransactionStatementSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hasFeeExemption: _, ...invalidTestValue } = validTestValue;
      expect(() => corporationTransactionStatementSchema.parse(invalidTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      expect(() =>
        corporationTransactionStatementSchema.parse({
          ...validTestValue,
          feeAccount: INVALID_FEE_ACCOUNT,
        }),
      ).toThrow();
    });
    it('required=falseの場合、notes以外のpropertyの値が不適切でもエラーとならないこと', () => {
      expect(() =>
        corporationTransactionStatementSchema.parse({
          ...validTestValue,
          required: 'false',
          feeAccount: INVALID_FEE_ACCOUNT,
        }),
      ).not.toThrow();
    });
  });
});
