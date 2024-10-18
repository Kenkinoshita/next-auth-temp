import { z } from 'zod';

import { monthSchema } from '@shared/schemas/month';

/**
 * 複数月選択の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const multipleMonthsSchema = z.array(monthSchema);

export type MultipleMonths = z.output<typeof multipleMonthsSchema>;
