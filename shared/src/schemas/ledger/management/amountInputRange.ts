import { z } from 'zod';

import { createNumericStringSchema } from '@shared/schemas/numericString';

export const MAX_AMOUNT = 9_999_999_999;

export const amountInputRangeSchema = z
  .object({
    min: createNumericStringSchema({ nan_error: '半角数字でご入力ください。' }).pipe(
      z
        .number()
        .int('整数でご入力ください。')
        .min(0, '0未満は入力できません。')
        .max(MAX_AMOUNT, '10,000,000,000以上は入力できません。'),
    ),
    max: z
      .string()
      // 入力が空の場合は、9,999,999,999に変換する
      .transform((v) => (v !== '' ? v : String(MAX_AMOUNT)))
      .pipe(
        createNumericStringSchema({ nan_error: '半角数字でご入力ください。' }).pipe(
          z
            .number()
            .int('整数でご入力ください。')
            .min(0, '0未満は入力できません。')
            .max(MAX_AMOUNT, '10,000,000,000以上は入力できません。'),
        ),
      ),
  })
  .superRefine(({ min, max }, ctx) => {
    if (min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        // FIXME: 仮で設定したので、後で修正する
        message: '下限値を上限値より大きくすることはできません。',
        path: ['min'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        // FIXME: 仮で設定したので、後で修正する
        message: '下限値を上限値より大きくすることはできません。',
        path: ['max'],
      });
    }
  });

export type AmountInputRangeInput = z.input<typeof amountInputRangeSchema>;
export type AmountInputRange = z.output<typeof amountInputRangeSchema>;

export const AMOUNT_INPUT_RANGE_DEFAULT_VALUE: Readonly<AmountInputRangeInput> = {
  min: '',
  max: '',
};
