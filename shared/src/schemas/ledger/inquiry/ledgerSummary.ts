import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { flagSchema } from '@shared/schemas/flag';
import { ledgerNameSchema } from '@shared/schemas/ledger/ledgerName';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { versionSchema } from '@shared/schemas/version';

/**
 * 「帳票照会」の検索結果を検証する
 * FIXME: バリデーションを修正する
 */
export const ledgerSummarySchema = z.object({
  no: z.number().gte(1),
  cic: cicSchema,
  createdDate: dateStringSchema,
  name: ledgerNameSchema,
  type: ledgerTypeSchema,
  version: versionSchema,
  isDeleted: flagSchema,
  isPublished: flagSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type LedgerSummaryInput = z.input<typeof ledgerSummarySchema>;
export type LedgerSummary = z.output<typeof ledgerSummarySchema>;
