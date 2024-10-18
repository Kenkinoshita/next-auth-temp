import { z } from 'zod';

import { ledgerPublishDateRangeSchema } from '@shared/schemas/ledger/ledgerPublishDateRange';
import { pageNumberSchema } from '@shared/schemas/pageNumber';
import { pageSizeSchema } from '@shared/schemas/pageSize';
import type { Expand } from '@shared/utils/utilityTypes';

/**
 * 「帳票照会」の検索条件の入力値を検証する
 */
export const ledgerInquirySearchConditionSchema = z.object({
  ledgerPublishDateRange: ledgerPublishDateRangeSchema,
  page: pageNumberSchema,
  size: pageSizeSchema,
});

export type LedgerInquirySearchConditionInput = z.input<typeof ledgerInquirySearchConditionSchema>;
export type LedgerInquirySearchCondition = Expand<z.output<typeof ledgerInquirySearchConditionSchema>>;

export const LEDGER_INQUIRY_SEARCH_CONDITION_INPUT_DEFAULT_VALUE: Readonly<LedgerInquirySearchConditionInput> = {
  ledgerPublishDateRange: { start: '', end: '' },
  page: '1',
  size: '20',
};
