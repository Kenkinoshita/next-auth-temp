import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { corporationCancelChoiceSchema } from '@shared/schemas/corporation/corporationCancelChoice';
import { corporationKanaSchema } from '@shared/schemas/corporation/corporationKana';
import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';
import { monthSchema } from '@shared/schemas/month';
import { multipleFeeBillingMethodsSchema } from '@shared/schemas/multipleFeeBillingMethods';
import { noneSchema } from '@shared/schemas/none';
import { pageNumberSchema } from '@shared/schemas/pageNumber';
import { pageSizeSchema } from '@shared/schemas/pageSize';
import type { Expand } from '@shared/utils/utilityTypes';
/**
 * 「法人一覧・一覧画面」の検索条件の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const corporationSearchConditionSchema = z.object({
  cic: z.string().trim().pipe(z.literal('').or(cicSchema)),
  name: z.string().trim().pipe(z.literal('').or(corporationNameSchema)),
  kana: z.string().trim().pipe(z.literal('').or(corporationKanaSchema)),
  feeBillingMethods: multipleFeeBillingMethodsSchema,
  balanceStatementIssuingBankMonth: noneSchema(monthSchema),
  balanceStatementIssuingAuditingFirmMonth: noneSchema(monthSchema),
  transactionStatementIssuingMonth: noneSchema(monthSchema),
  cancellationDate: corporationCancelChoiceSchema,
  page: pageNumberSchema,
  size: pageSizeSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationSearchConditionInput = z.input<typeof corporationSearchConditionSchema>;
export type CorporationSearchCondition = Expand<z.output<typeof corporationSearchConditionSchema>>;

export const CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE: Readonly<CorporationSearchConditionInput> = {
  cic: '',
  name: '',
  kana: '',
  feeBillingMethods: [],
  balanceStatementIssuingBankMonth: 'none',
  balanceStatementIssuingAuditingFirmMonth: 'none',
  transactionStatementIssuingMonth: 'none',
  cancellationDate: 'uncancelled',
  page: '1',
  size: '20',
};
