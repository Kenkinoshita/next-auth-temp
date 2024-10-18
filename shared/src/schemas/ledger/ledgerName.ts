import { z } from 'zod';

/**
 * 帳票名を検証する
 * FIXME: ロジックが決定次第バリデーションを修正する
 */
export const ledgerNameSchema = z.string().min(1).max(100);

// TODO: Propertyがoptionalになっているのを確認する
export type LedgerName = z.output<typeof ledgerNameSchema>;
