import { z } from 'zod';

import { feeAccountInterfaceSchema, feeAccountSchema } from '@shared/schemas/feeAccount';
import { feeBillingMethodSchema } from '@shared/schemas/feeBillingMethod';
import { falseFlagSchema, flagInterfaceSchema, flagSchema, trueFlagSchema } from '@shared/schemas/flag';
import { multipleMonthsSchema } from '@shared/schemas/multipleMonths';
import { noneSchema } from '@shared/schemas/none';
import { noneInterface } from '@shared/schemas/noneInterface';
import { notesSchema } from '@shared/schemas/notes';
import type { NestedReadonly, NestedRequired } from '@shared/utils/utilityTypes';

const issuingInterfaceSchema = z.object({
  required: flagInterfaceSchema,
  months: multipleMonthsSchema,
});
const requiredIssuingSchema = z.object({
  required: trueFlagSchema,
  months: multipleMonthsSchema.min(1, 'いずれかを選択してください。'),
});
const notRequiredIssuingSchema = z.object({
  required: falseFlagSchema,
});
const issuingStyleSchema = issuingInterfaceSchema.pipe(
  z.discriminatedUnion('required', [requiredIssuingSchema, notRequiredIssuingSchema]),
);

const interfaceSchema = z.object({
  required: noneInterface(flagInterfaceSchema, flagInterfaceSchema),
  bankStyle: issuingInterfaceSchema,
  auditingFirmStyle: issuingInterfaceSchema,
  requiredFeeNotification: noneSchema(flagInterfaceSchema),
  feeBillingMethod: noneSchema(feeBillingMethodSchema),
  feeAccount: feeAccountInterfaceSchema,
  hasFeeExemption: noneSchema(flagInterfaceSchema),
  notes: notesSchema,
});

const requiredSchema = z.object({
  required: trueFlagSchema,
  bankStyle: issuingStyleSchema,
  auditingFirmStyle: issuingStyleSchema,
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
 * 「法人一覧登録.残高証明書」の入力値を検証する
 */
export const corporationBalanceStatementSchema = interfaceSchema.pipe(
  z.discriminatedUnion('required', [requiredSchema, notRequiredSchema]),
);

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationBalanceStatementInput = NestedRequired<z.input<typeof corporationBalanceStatementSchema>>;
export type CorporationBalanceStatement = NestedRequired<z.output<typeof corporationBalanceStatementSchema>>;

export const CORPORATION_BALANCE_STATEMENT_INPUT_DEFAULT_VALUE: NestedReadonly<CorporationBalanceStatementInput> = {
  required: 'none',
  bankStyle: {
    required: 'false',
    months: [],
  },
  auditingFirmStyle: {
    required: 'false',
    months: [],
  },
  requiredFeeNotification: 'none',
  feeBillingMethod: 'none',
  feeAccount: {
    number: '',
    branchNumber: '',
  },
  hasFeeExemption: 'none',
  notes: '',
};
