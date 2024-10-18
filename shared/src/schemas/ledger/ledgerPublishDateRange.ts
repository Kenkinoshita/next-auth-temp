import { isAfter } from 'date-fns';
import { z } from 'zod';

import { ledgerPublishDateRange } from '@shared/consts/ledgerPublishDateRange';
import { dateStringRangeSchema } from '@shared/schemas/dateStringRange';

export const ledgerPublishDateRangeSchema = dateStringRangeSchema.superRefine(({ start, end }, ctx) => {
  if (isAfter(ledgerPublishDateRange.start, start)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `開始日を${ledgerPublishDateRange.start}より前に指定することはできません。`,
      path: ['start'],
    });
  }

  if (isAfter(end, ledgerPublishDateRange.end)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `終了日を${ledgerPublishDateRange.end}より後に指定することはできません。`,
      path: ['end'],
    });
  }
});
