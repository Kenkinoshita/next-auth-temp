import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { corporationKanaSchema } from '@shared/schemas/corporation/corporationKana';
import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';
import { multipleMonthsSchema } from '@shared/schemas/multipleMonths';

/**
 * 「法人一覧・一覧画面」の検索結果を検証する
 */
export const corporationSummarySchema = z.object({
  no: z.number().gte(1),
  cic: cicSchema,
  name: corporationNameSchema,
  kana: corporationKanaSchema,
  balanceStatementIssuingBankMonths: multipleMonthsSchema,
  balanceStatementIssuingAuditingFirmMonths: multipleMonthsSchema,
  transactionStatementIssuingMonths: multipleMonthsSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationSummaryInput = z.input<typeof corporationSummarySchema>;
export type CorporationSummary = z.output<typeof corporationSummarySchema>;

export const CORPORATION_SUMMARY_INPUT_DEFAULT_VALUE: Readonly<CorporationSummaryInput> = {
  no: 0,
  cic: '',
  name: '',
  kana: '',
  balanceStatementIssuingBankMonths: [],
  balanceStatementIssuingAuditingFirmMonths: [],
  transactionStatementIssuingMonths: [],
};
