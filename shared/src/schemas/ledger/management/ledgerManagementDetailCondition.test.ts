import {
  ledgerManagementDetailSchema,
  ledgerManagementDetailConditionSchema,
  ledgerManagementDetailConditionTableSchema,
} from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';

describe('ledgerManagementDetailCondition', () => {
  const validTestValue = {
    cic: '1234567890',
    createdDate: '2024-10-08',
    type: 'C301',
    page: '1',
    size: '5',
  };

  describe('ledgerManagementDetailSchema', () => {
    it('必要な値が全て入力されている場合、エラーとならないこと', () => {
      expect(() => ledgerManagementDetailSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        // cic: '1234567890',
        createdDate: '2024-10-08',
        type: 'C301',
        page: '1',
        size: '5',
      };
      expect(() => ledgerManagementDetailSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = {
        ...validTestValue,
        cic: 'invalid',
      };
      expect(() => ledgerManagementDetailSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('ledgerManagementDetailConditionSchema', () => {
    const validLedgerManagementDetailConditionTestValue = {
      cic: '1234567890',
      createdDate: '2024-10-08',
      type: 'C301',
    };

    it('必要な値が全て入力されている場合、エラーとならないこと', () => {
      expect(() =>
        ledgerManagementDetailConditionSchema.parse(validLedgerManagementDetailConditionTestValue),
      ).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyLedgerManagementDetailConditionTestValue = {
        // cic: '1234567890',
        createdDate: '2024-10-08',
        type: 'C301',
      };
      expect(() =>
        ledgerManagementDetailConditionSchema.parse(noPropertyLedgerManagementDetailConditionTestValue),
      ).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyLedgerManagementDetailConditionTestValue = {
        ...validLedgerManagementDetailConditionTestValue,
        cic: 'invalid',
      };
      expect(() =>
        ledgerManagementDetailConditionSchema.parse(invalidPropertyLedgerManagementDetailConditionTestValue),
      ).toThrow();
    });
  });

  describe('ledgerManagementDetailConditionTableSchema', () => {
    it('必要な値が全て入力されている場合、エラーとならないこと', () => {
      expect(() => ledgerManagementDetailConditionTableSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noPropertyTestValue = {
        // cic: '1234567890',
        createdDate: '2024-10-08',
        type: 'C301',
        page: '1',
        size: '5',
      };
      expect(() => ledgerManagementDetailConditionTableSchema.parse(noPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = {
        ...validTestValue,
        cic: 'invalid',
      };
      expect(() => ledgerManagementDetailConditionTableSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });
});
