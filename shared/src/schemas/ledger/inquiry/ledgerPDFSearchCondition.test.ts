import { ledgerPDFSearchConditionSchema } from '@shared/schemas/ledger/inquiry/ledgerPDFSearchCondition';

describe('ledgerPDFSearchCondition', () => {
  const validTestValue = {
    cic: '1234567890',
    createdDate: '2024-10-16',
    type: 'C301',
    version: 1,
  };

  it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
    expect(() => ledgerPDFSearchConditionSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    const noPropertyTestValue = {
      //   cic: '1234567890',
      createdDate: '2024-10-16',
      type: 'C301',
      version: 1,
    };
    expect(() => ledgerPDFSearchConditionSchema.parse(noPropertyTestValue)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidPropertyTestValue = { ...validTestValue, cic: 'invalid' };
    expect(() => ledgerPDFSearchConditionSchema.parse(invalidPropertyTestValue)).toThrow();
  });
});
