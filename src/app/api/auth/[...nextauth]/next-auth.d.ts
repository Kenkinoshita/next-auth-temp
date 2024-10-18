import type { DefaultSession, DefaultUser } from 'next-auth';

import type { BackTokenPayload } from '@shared/schemas/backTokenPayload';

// セッションとトークンにカスタムプロパティを追加するための型拡張
declare module 'next-auth' {
  interface Session {
    user: BackTokenPayload & DefaultSession['user'];
    sessionId?: string;
  }

  interface User extends DefaultUser, BackTokenPayload {
    expire: number;
    jti: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends BackTokenPayload {
    expire: number;
    jti: string;
  }
}
