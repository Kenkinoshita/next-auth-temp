import { z } from 'zod';

/**
 * 法人一覧 - 法人名の入力値を検証する
 */
export const corporationNameSchema = z
  .string()
  .min(1, '値をご入力ください。')
  .max(100, '100文字以内でご入力ください。');

export type CorporationName = z.output<typeof corporationNameSchema>;
