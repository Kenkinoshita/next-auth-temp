import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { versionSchema } from '@shared/schemas/version';
import { toStrictKeys } from '@shared/utils/utilityFunction';
import type { Expand } from '@shared/utils/utilityTypes';

const ledgerPDFSearchCondition = {
  cic: cicSchema,
  createdDate: dateStringSchema,
  type: ledgerTypeSchema,
  version: versionSchema,
};

/**
 * 「帳票照会」のPDFダウンロード時の検索条件の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const ledgerPDFSearchConditionSchema = z.object(ledgerPDFSearchCondition);

export type LedgerPDFSearchConditionInput = z.input<typeof ledgerPDFSearchConditionSchema>;
export type LedgerPDFSearchCondition = Expand<z.output<typeof ledgerPDFSearchConditionSchema>>;

export const KEYS_OF_LEDGER_PDF_SEARCH_CONDITION_SCHEMA = toStrictKeys(ledgerPDFSearchCondition);
