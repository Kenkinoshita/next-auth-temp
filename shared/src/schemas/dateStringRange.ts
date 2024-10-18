import { isAfter } from 'date-fns';
import { z } from 'zod';

import { dateStringSchema } from '@shared/schemas/dateString';

export const dateStringRangeSchema = z
  .object({
    start: z.string().trim().pipe(z.literal('').or(dateStringSchema)),
    end: z.string().trim().pipe(z.literal('').or(dateStringSchema)),
  })
  .superRefine(({ start, end }, ctx) => {
    if (isAfter(start, end)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        // FIXME: 仮で設定したので、後で修正する
        message: '開始日を終了日より後に指定することはできません。',
        path: ['start'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        // FIXME: 仮で設定したので、後で修正する
        message: '開始日を終了日より後に指定することはできません。',
        path: ['end'],
      });
    }
  });

export type DateStringRangeInput = z.input<typeof dateStringRangeSchema>;
export type DateStringRange = z.output<typeof dateStringRangeSchema>;

export const DATE_STRING_RANGE_DEFAULT_VALUE: Readonly<DateStringRangeInput> = {
  start: '',
  end: '',
};
