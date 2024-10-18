import { z } from 'zod';

import { feeAccountSchema } from '@shared/schemas/feeAccount';
import { feeBillingMethodSchema, feeBillingMethodForHeadquartersSchema } from '@shared/schemas/feeBillingMethod';
import { flagInterfaceSchema, flagSchema } from '@shared/schemas/flag';
import { noneInterface } from '@shared/schemas/noneInterface';
import { notesSchema } from '@shared/schemas/notes';
import { createNumericStringSchema } from '@shared/schemas/numericString';
import type { NestedReadonly, NestedRequired } from '@shared/utils/utilityTypes';

const regex = (length: number) => new RegExp(`^[0-9]{${length}}$`);

const generalSalaryBonusSchema = z.object({
  feeBillingMethod: noneInterface(feeBillingMethodSchema, feeBillingMethodSchema),
  feeAccount: feeAccountSchema.pipe(
    z.object({
      branchNumber: z.string().regex(regex(3), '数字3桁でご入力ください。'),
      number: z.string().regex(regex(7), '数字7桁でご入力ください。'),
    }),
  ),
});

const feeWithdrawalRequestSchema = z.object({
  requested: noneInterface(flagSchema, flagInterfaceSchema),
  notes: notesSchema,
});

const headquartersTransferSchema = z.object({
  feeBillingMethod: noneInterface(feeBillingMethodForHeadquartersSchema, feeBillingMethodForHeadquartersSchema),
  feeAccount: feeAccountSchema,
  feeAmount: createNumericStringSchema({ nan_error: '半角数字でご入力ください。' }).pipe(
    z
      .number()
      .int('整数でご入力ください。')
      .min(0, '0円以上9,999,999,999円以下の範囲でご入力ください。')
      .max(9_999_999_999, '0円以上9,999,999,999円以下の範囲でご入力ください。'),
  ),
  notes: notesSchema,
});

/**
 * 「法人一覧登録.総合振込・給与振込・賞与振込情報」、
 * 「法人一覧登録.総合振込に関する手数料引落依頼書」、
 * 「法人一覧登録.本部端末からの振込手数料」
 * の入力値を検証する
 */
export const corporationTransferInfoSchema = z.object({
  generalSalaryBonus: generalSalaryBonusSchema,
  feeWithdrawalRequest: feeWithdrawalRequestSchema,
  headquartersTransfer: headquartersTransferSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationTransferInfoInput = NestedRequired<z.input<typeof corporationTransferInfoSchema>>;
export type CorporationTransferInfo = z.output<typeof corporationTransferInfoSchema>;

export const CORPORATION_TRANSFER_INFO_INPUT_DEFAULT_VALUE: NestedReadonly<CorporationTransferInfoInput> = {
  generalSalaryBonus: {
    feeBillingMethod: 'none',
    feeAccount: {
      number: '',
      branchNumber: '',
    },
  },
  feeWithdrawalRequest: {
    requested: 'none',
    notes: '',
  },
  headquartersTransfer: {
    feeBillingMethod: 'none',
    feeAccount: {
      number: '',
      branchNumber: '',
    },
    feeAmount: '',
    notes: '',
  },
};
