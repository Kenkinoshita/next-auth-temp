import type { z } from 'zod';

import { corporationSummarySchema } from '@shared/schemas/corporation/corporationSummary';
import { createPaginationSchema } from '@shared/schemas/pagination';
import type { NestedReadonly } from '@shared/utils/utilityTypes';

export const corporationSearchResultSchema = createPaginationSchema(corporationSummarySchema);

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationSearchResultInput = z.input<typeof corporationSearchResultSchema>;
export type CorporationSearchResult = z.output<typeof corporationSearchResultSchema>;

export const CORPORATION_SEARCH_RESULT_INPUT_DEFAULT_VALUE: NestedReadonly<CorporationSearchResultInput> = {
  total: 0,
  pageNumber: 1,
  maxPage: 1,
  hasNext: false,
  items: [],
};
