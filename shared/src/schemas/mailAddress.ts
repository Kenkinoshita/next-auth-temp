import { z } from 'zod';

/**
 * メールアドレスの入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const mailAddressSchema = z.string().trim().email('メールアドレス形式で入力してください');

export type MailAddress = z.output<typeof mailAddressSchema>;
