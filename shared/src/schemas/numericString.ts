import { z } from 'zod';

/**
 * 数値入力の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const createNumericStringSchema = (errors?: { nan_error: string }) =>
  z
    .string()
    .transform((v) => +v)
    .pipe(
      z.unknown().superRefine((v, ctx) => {
        if (Number.isNaN(v)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: errors?.nan_error,
          });
        }
      }),
    )
    .pipe(z.number());
