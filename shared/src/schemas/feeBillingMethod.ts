import { z } from 'zod';

import { FEE_BILLING_METHOD, FEE_BILLING_METHOD_FOR_HEADQUARTERS } from '@shared/consts/feeBillingMethod';
import { toStrictKeys } from '@shared/utils/utilityFunction';

const [head, second, ...rest] = toStrictKeys(FEE_BILLING_METHOD).map((v) => z.literal(v));

/**
 * 振込手数料引落口座の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const feeBillingMethodSchema = z.union([head, second, ...rest]);

export type FeeBillingMethod = z.output<typeof feeBillingMethodSchema>;

/**
 * 本部端末からの振込手数料口座の入力値を検証する
 */
const [firsts, seconds, ...remain] = toStrictKeys(FEE_BILLING_METHOD_FOR_HEADQUARTERS).map((v) => z.literal(v));

export const feeBillingMethodForHeadquartersSchema = z.union([firsts, seconds, ...remain]);

export type FeeBillingMethodForHeadquarters = z.output<typeof feeBillingMethodForHeadquartersSchema>;
