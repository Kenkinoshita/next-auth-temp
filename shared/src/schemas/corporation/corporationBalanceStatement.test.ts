import { corporationBalanceStatementSchema } from '@shared/schemas/corporation/corporationBalanceStatement';

describe('corporationBalanceStatement', () => {
  const validTestValue = {
    required: 'true',
    bankStyle: {
      required: 'true',
      months: ['jan', 'feb'],
    },
    auditingFirmStyle: {
      required: 'true',
      months: ['jan', 'feb'],
    },
    requiredFeeNotification: 'true',
    feeBillingMethod: 'partial',
    feeAccount: {
      number: '1234567',
      branchNumber: '123',
    },
    hasFeeExemption: 'true',
    notes: 'auじぶん銀行',
  };

  const INVALID_FEE_ACCOUNT = {
    branchNumber: '123',
    number: 'invalid_value',
  };

  it('必要な値が全て入力されている場合、エラーとならないこと', () => {
    expect(() => corporationBalanceStatementSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasFeeExemption: _, ...invalidTestValue } = validTestValue;
    expect(() => corporationBalanceStatementSchema.parse(invalidTestValue)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    expect(() =>
      corporationBalanceStatementSchema.parse({
        ...validTestValue,
        feeAccount: INVALID_FEE_ACCOUNT,
      }),
    ).toThrow();
  });
  it('required=falseの場合、notes以外のpropertyの値が不適切でもエラーとならないこと', () => {
    expect(() =>
      corporationBalanceStatementSchema.parse({
        ...validTestValue,
        required: 'false',
        feeAccount: INVALID_FEE_ACCOUNT,
      }),
    ).not.toThrow();
  });
});
