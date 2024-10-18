import { z } from 'zod';

import { base64Schema } from '@shared/schemas/base64';
import type { Expand } from '@shared/utils/utilityTypes';

/**
 * 「法人一覧」のCSVダウンロードで利用する
 */
export const corporationCsvResultSchema = z.object({
  file: base64Schema,
  fileName: z.string().min(1).max(300),
});

export type CorporationCsvResultInput = z.input<typeof corporationCsvResultSchema>;
export type CorporationCsvResult = Expand<z.output<typeof corporationCsvResultSchema>>;
