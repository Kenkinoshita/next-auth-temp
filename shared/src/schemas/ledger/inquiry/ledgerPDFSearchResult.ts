import { z } from 'zod';

import { base64Schema } from '@shared/schemas/base64';
import type { Expand } from '@shared/utils/utilityTypes';

/**
 * 「帳票照会」のPDFダウンロード結果を検証する
 * FIXME: バリデーションを修正する
 */
export const ledgerPDFSearchResultSchema = z.object({
  pdfData: base64Schema,
  fileName: z.string().min(1).max(300),
});

export type LedgerPDFSearchResultInput = z.input<typeof ledgerPDFSearchResultSchema>;
export type LedgerPDFSearchResult = Expand<z.output<typeof ledgerPDFSearchResultSchema>>;

export const LEDGER_PDF_SEARCH_RESULT_INPUT_DEFAULT_VALUE: Readonly<LedgerPDFSearchResultInput> = {
  pdfData: '',
  fileName: '',
};
