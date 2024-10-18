import { isValid } from 'date-fns';
import { z } from 'zod';

import { dateStringToDate } from '@shared/utils/date';

export const dateTimeStringSchema = z.string().superRefine((v, ctx) => {
  if (!isValid(dateStringToDate(v, 'yyyy-MM-dd HH:mm:ss'))) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: '有効な日付をご入力ください。',
    });
  }
});
