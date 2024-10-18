import { z } from 'zod';

import { MONTH } from '@shared/consts/month';
import { toStrictKeys } from '@shared/utils/utilityFunction';

const [head, second, ...rest] = toStrictKeys(MONTH).map((v) => z.literal(v));

/**
 * 月選択の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const monthSchema = z.union([head, second, ...rest]);

export type Month = z.output<typeof monthSchema>;
