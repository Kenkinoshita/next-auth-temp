import { z } from 'zod';

import { createNumericStringSchema } from '@shared/schemas/numericString';

/**
 * 検索結果を取得する際のページ数を検証する
 * FIXME: バリデーションを修正する
 */
export const pageNumberSchema = createNumericStringSchema().pipe(z.number().min(1));

export type PageNumber = z.output<typeof pageNumberSchema>;
