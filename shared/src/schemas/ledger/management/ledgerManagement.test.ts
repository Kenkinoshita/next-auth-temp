import { ledgerManagementSearchConditionSchema } from '@shared/schemas/ledger/management/ledgerManagement';

describe('ledgerManagementSearchConditionSchema', () => {
  const validData = {
    page: '1',
    size: '20',
    responsibleDepartment: 'd001',
    cic: '1234567890',
    companyName: '株式会社サンプル',
    isPartial: 'true',
    amountRange: { min: '5000', max: '10000' },
    createdDateRange: { start: '2024-04-01', end: '2024-05-01' },
  };

  it('必要な値を全て入力する場合、エラーとならないこと', () => {
    expect(() => ledgerManagementSearchConditionSchema.parse(validData)).not.toThrow();
  });

  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    //NOTE: eslintがresponsibleDepartmentに対してエラーを出してしまうのを防ぐため。
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { responsibleDepartment, ...invalidData } = validData;
    expect(() => ledgerManagementSearchConditionSchema.parse(invalidData)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidValue = { ...validData, responsibleDepartment: 'a001' };
    expect(() => ledgerManagementSearchConditionSchema.parse(invalidValue)).toThrow();
  });

  describe('cic', () => {
    it('cicが空文字の場合、エラーにならないこと', () => {
      const customValidValue = { ...validData, cic: '' };
      expect(() => ledgerManagementSearchConditionSchema.parse(customValidValue)).not.toThrow();
    });
  });

  describe('companyName', () => {
    describe('データ型が正しいか', () => {
      it('空文字の場合、エラーにならないこと', () => {
        const validValue = { ...validData, companyName: '' };
        expect(() => ledgerManagementSearchConditionSchema.parse(validValue)).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        const invalidValue = { ...validData, companyName: 1234567890 };
        expect(() => ledgerManagementSearchConditionSchema.parse(invalidValue)).toThrow();
      });
    });

    describe('前後の余白を無視するか', () => {
      it('前後に余白がある場合、エラーとならないこと', () => {
        const firstBlankValidData = { ...validData, companyName: ' 1234567890' };
        const lastBlankValidData = { ...validData, companyName: '1234567890 ' };
        const firstAndLastBlankValidData = { ...validData, companyName: ' 1234567890 ' };
        expect(() => ledgerManagementSearchConditionSchema.parse(firstBlankValidData)).not.toThrow();
        expect(() => ledgerManagementSearchConditionSchema.parse(lastBlankValidData)).not.toThrow();
        expect(() => ledgerManagementSearchConditionSchema.parse(firstAndLastBlankValidData)).not.toThrow();
      });
    });

    describe('桁数が正しいか', () => {
      const character = 'あ';
      const maxCharacter = character.repeat(38);
      const overMaxCharacter = character.repeat(39);
      it('38桁以内の場合、エラーとならないこと', () => {
        const validValue = { ...validData, companyName: maxCharacter };
        expect(() => ledgerManagementSearchConditionSchema.parse(validValue)).not.toThrow();
      });
      it('39桁以上の場合、エラーとなること', () => {
        const invalidValue = { ...validData, companyName: overMaxCharacter };
        expect(() => ledgerManagementSearchConditionSchema.parse(invalidValue)).toThrow();
      });
    });
  });
});
