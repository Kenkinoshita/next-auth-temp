import { z } from 'zod';

/** 正規表現（全角カタカナ＋長音記号） */
const regex = /^[ァ-ヴー]+$/;

/**
 * 法人一覧 - 法人名（カナ）の入力値を検証する
 */
export const corporationKanaSchema = z
  .string()
  .min(1, '値をご入力ください。')
  .max(100, '100文字以内でご入力ください。')
  .regex(regex, '全角カタカナでご入力ください。');

export type CorporationKana = z.output<typeof corporationKanaSchema>;
