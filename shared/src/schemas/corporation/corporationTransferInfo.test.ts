import { corporationTransferInfoSchema } from '@shared/schemas/corporation/corporationTransferInfo';

describe('corporationTransferInfo', () => {
  const validTestValue = {
    generalSalaryBonus: {
      feeBillingMethod: 'partial',
      feeAccount: {
        number: '1234567',
        branchNumber: '123',
      },
    },
    feeWithdrawalRequest: {
      requested: 'true',
      notes: 'テキスト',
    },
    headquartersTransfer: {
      feeBillingMethod: 'partial',
      feeAccount: {
        number: '1234567',
        branchNumber: '123',
      },
      feeAmount: '1234567890',
      notes: 'テキスト',
    },
  };

  describe('オブジェクトとして正しく機能するか', () => {
    it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
      expect(() => corporationTransferInfoSchema.parse(validTestValue)).not.toThrow();
    });
    it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
      const noCorporationTransferInfoPropertyTestValue = {
        // generalSalaryBonus: {
        //   feeBillingMethod: 'partial',
        //   feeAccount: {
        //     number: '1234567',
        //     branchNumber: '123',
        //   },
        // },
        feeWithdrawalRequest: {
          requested: 'true',
          notes: 'テキスト',
        },
        headquartersTransfer: {
          feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
          feeAmount: '1234567890',
          notes: 'テキスト',
        },
      };
      expect(() => corporationTransferInfoSchema.parse(noCorporationTransferInfoPropertyTestValue)).toThrow();
      const noGeneralSalaryBonusPropertyTestValue = {
        generalSalaryBonus: {
          // feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
        },
        feeWithdrawalRequest: {
          requested: 'true',
          notes: 'テキスト',
        },
        headquartersTransfer: {
          feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
          feeAmount: '1234567890',
          notes: 'テキスト',
        },
      };
      expect(() => corporationTransferInfoSchema.parse(noGeneralSalaryBonusPropertyTestValue)).toThrow();
      const noFeeWithdrawalRequestPropertyTestValue = {
        generalSalaryBonus: {
          feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
        },
        feeWithdrawalRequest: {
          // requested: 'true',
          notes: 'テキスト',
        },
        headquartersTransfer: {
          feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
          feeAmount: '1234567890',
          notes: 'テキスト',
        },
      };
      expect(() => corporationTransferInfoSchema.parse(noFeeWithdrawalRequestPropertyTestValue)).toThrow();
      const noHeadquartersTransferPropertyTestValue = {
        generalSalaryBonus: {
          feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
        },
        feeWithdrawalRequest: {
          requested: 'true',
          notes: 'テキスト',
        },
        headquartersTransfer: {
          // feeBillingMethod: 'partial',
          feeAccount: {
            number: '1234567',
            branchNumber: '123',
          },
          feeAmount: '1234567890',
          notes: 'テキスト',
        },
      };
      expect(() => corporationTransferInfoSchema.parse(noHeadquartersTransferPropertyTestValue)).toThrow();
    });
    it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
      const invalidPropertyTestValue = { ...validTestValue, generalSalaryBonus: 'invalid' };
      expect(() => corporationTransferInfoSchema.parse(invalidPropertyTestValue)).toThrow();
    });
  });

  describe('headquartersTransferSchema, feeAmount', () => {
    const validHeadquartersTransferTestValue = {
      feeBillingMethod: 'partial',
      feeAccount: {
        number: '1234567',
        branchNumber: '123',
      },
      feeAmount: '1234567890',
      notes: 'テキスト',
    };

    describe('データ型が正しいか', () => {
      it('string型の数値である場合、number型に変換されエラーとならないこと', () => {
        expect(() => corporationTransferInfoSchema.parse(validTestValue)).not.toThrow();
      });
      it('string型の数値でない場合、エラーとなること', () => {
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: 1234567890 },
          }),
        ).toThrow();
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: null },
          }),
        ).toThrow();
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: undefined },
          }),
        ).toThrow();
      });
    });
    describe('最大値、最小値が正しいか', () => {
      it('値が0以上の場合、エラーとならないこと', () => {
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: '' },
          }),
        ).not.toThrow();
      });
      it('値が9,999,999,999以下の場合、エラーとならないこと', () => {
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: '9999999999' },
          }),
        ).not.toThrow();
      });
      it('値が10,000,000,000以上の場合、エラーとなること', () => {
        expect(() =>
          corporationTransferInfoSchema.parse({
            ...validTestValue,
            headquartersTransfer: { ...validHeadquartersTransferTestValue, feeAmount: '10000000000' },
          }),
        ).toThrow();
      });
    });
  });
});
