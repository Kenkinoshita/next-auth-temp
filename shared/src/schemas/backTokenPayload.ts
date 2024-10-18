import { z } from 'zod';

import { toStrictKeys } from '@shared/utils/utilityFunction';

//FIXME: バリデーションを修正する
const backTokenPayload = {
  type: z.literal('back'),
  userName: z.string(),
  roleId: z.string(),
  sessionKey: z.string(),
  permissions: z.string().array(),
};

/**
 * ポータルで使用するトークンに含める情報
 */
export const backTokenPayloadSchema = z.object(backTokenPayload);

export type BackTokenPayload = z.output<typeof backTokenPayloadSchema>;

export const KEYS_OF_BACK_TOKEN_PAYLOAD_SCHEMA = toStrictKeys(backTokenPayload);

export const BACK_TOKEN_PAYLOAD_DEFAULT_VALUE: Readonly<BackTokenPayload> = {
  type: 'back',
  userName: '検証用テスト口座',
  roleId: '',
  sessionKey: '',
  permissions: [],
};
