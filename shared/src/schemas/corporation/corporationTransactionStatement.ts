import { z } from 'zod';

import { feeAccountInterfaceSchema, feeAccountSchema } from '@shared/schemas/feeAccount';
import { feeBillingMethodSchema } from '@shared/schemas/feeBillingMethod';
import { falseFlagSchema, flagInterfaceSchema, flagSchema, trueFlagSchema } from '@shared/schemas/flag';
import { multipleMonthsSchema } from '@shared/schemas/multipleMonths';
import { noneSchema } from '@shared/schemas/none';
import { noneInterface } from '@shared/schemas/noneInterface';
import { notesSchema } from '@shared/schemas/notes';
import type { NestedReadonly, NestedRequired } from '@shared/utils/utilityTypes';

const interfaceSchema = z.object({
  required: noneInterface(flagInterfaceSchema, flagInterfaceSchema),
  months: multipleMonthsSchema,
  requiredFeeNotification: noneSchema(flagInterfaceSchema),
  feeBillingMethod: noneSchema(feeBillingMethodSchema),
  feeAccount: feeAccountInterfaceSchema,
  hasFeeExemption: noneSchema(flagInterfaceSchema),
  notes: notesSchema,
});
const requiredSchema = z.object({
  required: trueFlagSchema,
  months: multipleMonthsSchema.min(1, 'いずれかを選択してください。'),
  requiredFeeNotification: flagSchema,
  feeBillingMethod: feeBillingMethodSchema,
  feeAccount: feeAccountSchema,
  hasFeeExemption: flagSchema,
  notes: notesSchema,
});
const notRequiredSchema = z.object({
  required: falseFlagSchema,
  notes: notesSchema,
});

/**
 * 「法人一覧登録.取引明細書」の入力値を検証する
 */
export const corporationTransactionStatementSchema = interfaceSchema.pipe(
  z.discriminatedUnion('required', [requiredSchema, notRequiredSchema]),
);

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationTransactionStatementInput = NestedRequired<
  z.input<typeof corporationTransactionStatementSchema>
>;
export type CorporationTransactionStatement = z.output<typeof corporationTransactionStatementSchema>;

export const CORPORATION_TRANSACTION_STATEMENT_INPUT_DEFAULT_VALUE: NestedReadonly<CorporationTransactionStatementInput> =
  {
    required: 'none',
    months: [],
    requiredFeeNotification: 'none',
    feeBillingMethod: 'none',
    feeAccount: {
      number: '',
      branchNumber: '',
    },
    hasFeeExemption: 'none',
    notes: '',
  };
