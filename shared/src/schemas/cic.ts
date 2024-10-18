import { z } from 'zod';

/**
 * CICの入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const cicSchema = z
  .string()
  .trim()
  .length(10, '10桁でご入力ください')
  .regex(/^[0-9]{10}$/, '半角数字でご入力ください');

export type CIC = z.output<typeof cicSchema>;
