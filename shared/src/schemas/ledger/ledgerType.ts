import { z } from 'zod';

import { DOCUMENT_TYPE_LIST } from '@shared/consts/documentTypeList';

const [head, second, ...rest] = DOCUMENT_TYPE_LIST.map(({ documentType }) => z.literal(documentType));

/**
 * 帳票種別を検証する
 */
export const ledgerTypeSchema = z.union([head, second, ...rest]);

// TODO: Propertyがoptionalになっているのを確認する
export type LedgerType = z.output<typeof ledgerTypeSchema>;
