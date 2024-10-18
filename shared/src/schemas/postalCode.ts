import { z } from 'zod';

const regex = /^[0-9]{7}$/;

/**
 * 郵便番号の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const postalCodeSchema = z.string().trim().regex(regex, '数字7桁で入力してください。');

export type PostalCode = z.output<typeof postalCodeSchema>;
