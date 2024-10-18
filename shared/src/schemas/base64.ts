import { z } from 'zod';

import { Base64Manager } from '@shared/utils/Base64Manager';

/**
 * base64でエンコードされた文字列の入力値を検証する
 * FIXME: バリデーションを修正する
 */
export const base64Schema = z
  .string()
  .min(1)
  .superRefine((v, ctx) => {
    if (!Base64Manager.isBase64(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '有効なbase64形式の文字列を入力してください。',
      });
    }
  });

export type Base64 = z.output<typeof base64Schema>;
