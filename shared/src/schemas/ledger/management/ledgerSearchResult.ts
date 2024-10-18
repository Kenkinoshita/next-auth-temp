import type { z } from 'zod';

import { ledgerSummarySchema } from '@shared/schemas/ledger/management/ledgerSummary';
import { createPaginationSchema } from '@shared/schemas/pagination';
import type { NestedReadonly } from '@shared/utils/utilityTypes';

export const ledgerSearchResultSchema = createPaginationSchema(ledgerSummarySchema);

// TODO: Propertyがoptionalになっているのを確認する
export type LedgerSearchResultInput = z.input<typeof ledgerSearchResultSchema>;
export type LedgerSearchResult = z.output<typeof ledgerSearchResultSchema>;

export const LEDGER_SEARCH_RESULT_INPUT_DEFAULT_VALUE: NestedReadonly<LedgerSearchResultInput> = {
  total: 0,
  pageNumber: 1,
  maxPage: 1,
  hasNext: false,
  items: [],
};
