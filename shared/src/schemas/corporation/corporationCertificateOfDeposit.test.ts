import { corporationCertificateOfDepositSchema } from '@shared/schemas/corporation/corporationCertificateOfDeposit';

describe.skip('corporationCertificateOfDeposit', () => {
  const validTestValue = {
    hasDeposit: 'true',
    note: 'テキスト',
  };

  it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
    expect(() => corporationCertificateOfDepositSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    const invalidTestValue1 = {
      note: 'テキスト',
    };
    expect(() => corporationCertificateOfDepositSchema.parse(invalidTestValue1)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidTestValue2 = {
      hasDeposit: 'invalid',
      note: 'テキスト',
    };
    expect(() => corporationCertificateOfDepositSchema.parse(invalidTestValue2)).toThrow();
  });
});
