import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { versionSchema } from '@shared/schemas/version';
import type { Expand } from '@shared/utils/utilityTypes';

/**
 * 「帳票照会」および「帳票管理」において帳票を一意に特定するキーの検証を行う
 * FIXME: バリデーションを修正する
 */
export const ledgerPrimaryKeysSchema = z.object({
  cic: cicSchema,
  createdDate: dateStringSchema,
  type: ledgerTypeSchema,
  version: versionSchema,
});

export type LedgerPrimaryKeysInput = z.input<typeof ledgerPrimaryKeysSchema>;
export type LedgerPrimaryKeys = Expand<z.output<typeof ledgerPrimaryKeysSchema>>;
