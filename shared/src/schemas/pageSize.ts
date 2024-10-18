import { z } from 'zod';

import { createNumericStringSchema } from '@shared/schemas/numericString';

/**
 * 画面に表示する件数を検証する
 * FIXME: バリデーションを修正する
 */
export const pageSizeSchema = createNumericStringSchema().pipe(z.number().multipleOf(5).min(5).max(100));

export type PageSize = z.output<typeof pageSizeSchema>;
