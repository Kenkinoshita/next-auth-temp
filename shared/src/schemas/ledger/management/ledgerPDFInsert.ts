import { z } from 'zod';

import { base64Schema } from '@shared/schemas/base64';
import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { versionSchema } from '@shared/schemas/version';
import type { Expand } from '@shared/utils/utilityTypes';

/**
 * 「帳票管理」の帳票PDF登録時の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const ledgerPDFInsertSchema = z.object({
  cic: cicSchema,
  createdDate: dateStringSchema,
  type: ledgerTypeSchema,
  version: versionSchema,
  pdfData: base64Schema,
});

export type LedgerPDFInsertInput = z.input<typeof ledgerPDFInsertSchema>;
export type LedgerPDFInsert = Expand<z.output<typeof ledgerPDFInsertSchema>>;
