import { z } from 'zod';

export const feeAccountInterfaceSchema = z.object({
  branchNumber: z.string(),
  number: z.string(),
});

/**
 * 引落口座の店番と口座番号の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const feeAccountSchema = feeAccountInterfaceSchema.pipe(
  z.object({
    branchNumber: z.string().max(3, '3桁で入力してください'),
    number: z.string().max(7, '7桁で入力してください'),
  }),
);

export type FeeAccount = z.output<typeof feeAccountSchema>;
