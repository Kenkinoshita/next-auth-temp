import { z } from 'zod';

/**
 * 備考の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const notesSchema = z.string().max(100, '100字以内でご入力ください。');

// TODO: Propertyがoptionalになっているのを確認する
export type Notes = z.output<typeof notesSchema>;
