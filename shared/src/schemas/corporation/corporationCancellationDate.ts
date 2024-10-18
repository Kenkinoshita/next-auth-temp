import { isAfter } from 'date-fns';
import { z } from 'zod';

import { dateStringSchema } from '@shared/schemas/dateString';
import { dateStringToDate, getCurrentDate } from '@shared/utils/date';

/**
 *  解約日
 */
export const corporationCancellationDateSchema = dateStringSchema.superRefine((value, ctx) => {
  const date = dateStringToDate(value, 'yyyy-MM-dd');
  const currentDate = getCurrentDate();

  // 明日以降の日付はNG
  if (isAfter(date, currentDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      // FIXME: メッセージは仮なので、後で置き換えること
      message: '本日以前の日付をご入力ください',
    });
  }
});

export type CorporationCancellationDateInput = z.input<typeof corporationCancellationDateSchema>;
export type CorporationCancellationDate = z.output<typeof corporationCancellationDateSchema>;

export const CORPORATION_CANCELLATION_DATE_DEFAULT_VALUE = '';
