import { ledgerInquirySearchConditionSchema } from '@shared/schemas/ledger/inquiry/ledgerInquiry';

describe('ledgerInquiry', () => {
  const validTestValue = {
    ledgerPublishDateRange: {
      start: '2024-01-01',
      end: '2024-01-05',
    },
    page: '1',
    size: '5',
  };

  it('全てのpropertyで適切な値を設定している場合、エラーとならないこと', () => {
    expect(() => ledgerInquirySearchConditionSchema.parse(validTestValue)).not.toThrow();
  });
  it('どれか一つでもpropertyが存在しない場合、エラーとなること', () => {
    const noPropertyTestValue = {
      ledgerPublishDateRange: {
        start: '2024-01-01',
        end: '2024-01-05',
      },
      //   page: '1',
      size: '5',
    };
    expect(() => ledgerInquirySearchConditionSchema.parse(noPropertyTestValue)).toThrow();
  });
  it('どれか一つでもpropertyが不適切である場合、エラーとなること', () => {
    const invalidPropertyTestValue = { ...validTestValue, page: 'invalid' };
    expect(() => ledgerInquirySearchConditionSchema.parse(invalidPropertyTestValue)).toThrow();
  });
});
