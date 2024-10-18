import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';
import { dateStringSchema } from '@shared/schemas/dateString';
import { ledgerNameSchema } from '@shared/schemas/ledger/ledgerName';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import type { Expand } from '@shared/utils/utilityTypes';
/**
 * 「帳票管理一覧」の検索条件のレスポンスを検証する
 */
export const ledgerSummarySchema = z.object({
  no: z.number().gte(1),
  cic: cicSchema,
  createdDate: dateStringSchema,
  corporationName: corporationNameSchema,
  documentTypeCode: ledgerTypeSchema,
  documentTypeName: ledgerNameSchema,
});

export type LedgerSummaryInput = z.input<typeof ledgerSummarySchema>;
export type LedgerSummary = Expand<z.output<typeof ledgerSummarySchema>>;
