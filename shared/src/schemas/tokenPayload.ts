import { z } from 'zod';

import { backTokenPayloadSchema } from '@shared/schemas/backTokenPayload';
import { portalTokenPayloadSchema } from '@shared/schemas/portalTokenPayload';

export const tokenPayloadSchema = z.discriminatedUnion('type', [portalTokenPayloadSchema, backTokenPayloadSchema]);

export type TokenPayload = z.output<typeof tokenPayloadSchema>;
