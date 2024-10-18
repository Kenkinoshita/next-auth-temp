import { ledgerPublishDateRange } from '@shared/consts/ledgerPublishDateRange';
import { ledgerPublishDateRangeSchema } from '@shared/schemas/ledger/ledgerPublishDateRange';

const VALID_DATE = {
  start: '2024-01-01',
  end: '2024-01-05',
};

describe('ledgerPublishDateRangeSchema', () => {
  it(`開始日が${ledgerPublishDateRange.start}より前の場合、エラーとする`, () => {
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, start: '2019-12-31' })).toThrow();
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, start: '2020-01-01' })).not.toThrow();
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, start: '2020-01-02' })).not.toThrow();
  });
  it(`終了日を${ledgerPublishDateRange.end}より後の場合、エラーとする`, () => {
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, end: '2099-12-30' })).not.toThrow();
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, end: '2099-12-31' })).not.toThrow();
    expect(() => ledgerPublishDateRangeSchema.parse({ ...VALID_DATE, end: '2100-01-01' })).toThrow();
  });
});
