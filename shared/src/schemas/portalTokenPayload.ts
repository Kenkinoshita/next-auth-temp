import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';
import { toStrictKeys } from '@shared/utils/utilityFunction';

//FIXME: バリデーションを修正する
const portalTokenPayload = {
  type: z.literal('portal'),
  userName: z.string(),
  cic: cicSchema,
  sessionKey: z.string(),
  lastLogin: z.string(),
  corporationName: corporationNameSchema,
};
/**
 * ポータルで使用するトークンに含める情報
 */
export const portalTokenPayloadSchema = z.object(portalTokenPayload);

export type PortalTokenPayload = z.output<typeof portalTokenPayloadSchema>;

export const KEYS_OF_PORTAL_TOKEN_PAYLOAD_SCHEMA = toStrictKeys(portalTokenPayload);

export const PORTAL_TOKEN_PAYLOAD_DEFAULT_VALUE: Readonly<PortalTokenPayload> = {
  type: 'portal',
  cic: '1234567890',
  userName: 'テスト太郎',
  sessionKey: 'session12345',
  lastLogin: '2024-01-01 12:00',
  corporationName: 'KDDI',
};
