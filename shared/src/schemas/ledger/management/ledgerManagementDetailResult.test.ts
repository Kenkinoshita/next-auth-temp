import { ledgerManagementDetailConditionResultSchema } from '@shared/schemas/ledger/management/ledgerManagementDetailResult';

describe('ledgerManagementDetailResult', () => {
  const validTestValue = {
    cic: '1234567890',
    companyName: 'auじぶん銀行',
    createdDate: '2024-10-08',
    documentTypeName: '振込手数料引落事前通知書',
    documentTypeCode: 'C301',
    isPublished: 'true',
    isDeleted: 'true',
    latestVersion: 1,
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => ledgerManagementDetailConditionResultSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        // cic: '1234567890',
        companyName: 'auじぶん銀行',
        createdDate: '2024-10-08',
        documentTypeName: '振込手数料引落事前通知書',
        documentTypeCode: 'C301',
        isPublished: 'true',
        isDeleted: 'true',
        latestVersion: 1,
      };
      expect(() => ledgerManagementDetailConditionResultSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, cic: 'invalid' };
      expect(() => ledgerManagementDetailConditionResultSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('companyName', () => {
    describe('データ型が正しいか', () => {
      it('string型である場合、エラーとならないこと', () => {
        expect(() => ledgerManagementDetailConditionResultSchema.parse(validTestValue)).not.toThrow();
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse({ ...validTestValue, companyName: '123' }),
        ).not.toThrow();
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse({ ...validTestValue, companyName: 123 + 'auじぶん銀行' }),
        ).not.toThrow();
      });
      it('string型でない場合、エラーとなること', () => {
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse({ ...validTestValue, companyName: 123 }),
        ).toThrow();
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse({ ...validTestValue, companyName: null }),
        ).toThrow();
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse({ ...validTestValue, companyName: undefined }),
        ).toThrow();
      });
    });

    describe('文字数が正しいか', () => {
      const character = 'あ';
      const gte1CompanyNameCharacterTestValue = { ...validTestValue, companyName: character.repeat(1) };
      const lte0CompanyNameCharacterTestValue = { ...validTestValue, companyName: character.repeat(0) };
      const lte100CompanyNameCharacterTestValue = { ...validTestValue, companyName: character.repeat(100) };
      const gte101CompanyNameCharacterTestValue = { ...validTestValue, companyName: character.repeat(101) };

      it('文字数が1文字以上である場合、エラーとならないこと', () => {
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse(gte1CompanyNameCharacterTestValue),
        ).not.toThrow();
      });
      it('文字数が0文字である場合、エラーとなること', () => {
        expect(() => ledgerManagementDetailConditionResultSchema.parse(lte0CompanyNameCharacterTestValue)).toThrow();
      });
      it('文字数が100文字以下である場合、エラーとならないこと', () => {
        expect(() =>
          ledgerManagementDetailConditionResultSchema.parse(lte100CompanyNameCharacterTestValue),
        ).not.toThrow();
      });
      it('文字数が101文字以上である場合、エラーとなること', () => {
        expect(() => ledgerManagementDetailConditionResultSchema.parse(gte101CompanyNameCharacterTestValue)).toThrow();
      });
    });
  });
});
