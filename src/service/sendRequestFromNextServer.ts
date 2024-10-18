import { isCookieSameSite } from '@shared/features/auth/session';
import { createSendRequestFromNextServer } from '@shared/service/createSendRequestFromNextServer';

export const sendRequestFromNextServer = createSendRequestFromNextServer({
  ignoredSession: process.env.IGNORED_SESSION === '1',
  secretKey: process.env.NEXTAUTH_SECRET,
  sessionMaxAge: +process.env.SESSION_MAX_AGE_SEC,
  sessionKey: process.env.NEXTAUTH_COOKIE_SESSION_KEY_NAME,
  cookieSecure: process.env.NEXTAUTH_COOKIE_SECURE === 'true',
  cookieSameSite: isCookieSameSite(process.env.NEXTAUTH_COOKIE_SAMESITE) ? process.env.NEXTAUTH_COOKIE_SAMESITE : 'lax',
});
