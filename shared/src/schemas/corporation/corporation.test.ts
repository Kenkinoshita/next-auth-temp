import { corporationSchema } from '@shared/schemas/corporation/corporation';
import { dateStringToDate } from '@shared/utils/date';

const TEST_DATE = '2025-08-26';

describe('corporation', () => {
  const validTestValue = {
    basicInfo: {
      cic: '1234567890',
      name: 'auじぶん銀行',
      kana: 'エーユージブンギンコウ',
      note: 'テキスト',
    },
    certificateOfDeposit: {
      hasDeposit: 'true',
      note: 'テキスト',
    },
    transferInfo: {
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
        feeAmount: '100',
        notes: 'テキスト',
      },
    },
    nickname: {
      required: 'true',
      name: 'auじぶん銀行',
      kana: 'エーユージブンギンコウ',
    },
    representative: {
      required: 'true',
      name: 'auじぶん銀行',
    },
    balanceStatement: {
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
      notes: 'テキスト',
    },
    transactionStatement: {
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
    },
    destinationAddress: {
      corporationName: 'auじぶん銀行',
      name: '山田太郎',
      honorificTitle: '様',
      postalCode: '1234567',
      address: '東京都中央区日本橋',
      buildingName: '日本橋ダイヤビルディング',
      phoneNumber: '00011112222',
    },
    usedPortal: 'true',
    cancellationDate: '2025-08-26',
  };

  beforeAll(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
    vi.setSystemTime(dateStringToDate(TEST_DATE, 'yyyy-MM-dd'));
  });

  afterAll(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('必要な値を全て入力する場合、エラーとならないこと', () => {
    expect(() => corporationSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    //NOTE: eslintがbasicInfoに対してエラーを出してしまうのを防ぐため。
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { basicInfo, ...invalidTestValue1 } = validTestValue;
    expect(() => corporationSchema.parse(invalidTestValue1)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidTestValue2 = { ...validTestValue, basicInfo: 'invalid' };
    expect(() => corporationSchema.parse(invalidTestValue2)).toThrow();
  });
});
