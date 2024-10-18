import { z } from 'zod';

import { feeBillingMethodSchema } from '@shared/schemas/feeBillingMethod';

/**
 * 振込手数料引落口座の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const multipleFeeBillingMethodsSchema = z.array(feeBillingMethodSchema);

export type MultipleFeeBillingMethods = z.output<typeof multipleFeeBillingMethodsSchema>;
