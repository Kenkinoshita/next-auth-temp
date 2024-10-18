import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';

import { apiClientForAuth } from '@/service/apiClientForAuth';
import { HTTP_STATUS_CODES } from '@shared/consts/httpStatusCodes';
import { SYSTEM_TYPE } from '@shared/consts/systemType';
import { decrypt } from '@shared/features/auth/authCrypto';
import {
  generateSessionId,
  registerSessionCookie,
  isCookieSameSite,
  getSessionKeyName,
} from '@shared/features/auth/session';
import { decodeSearchParams } from '@shared/features/tokenPayload';
import { getCurrentDate } from '@shared/utils/date';

const DEFAULT_SESSION_MAX_AGE_SEC = '1800'; // セッション有効期限（秒）
const secure = process.env.NEXTAUTH_COOKIE_SECURE === 'true';
const sameSite = isCookieSameSite(process.env.NEXTAUTH_COOKIE_SAMESITE) ? process.env.NEXTAUTH_COOKIE_SAMESITE : 'lax';
const systemType = SYSTEM_TYPE.back;

type AuthResponse = {
  authStatus: boolean;
  message: string;
};

type TokenPayload = {
  userName: string;
  roleId: string;
  sessionKey: string;
  expireAt: number;
};

/**
 * トークンの復号化処理
 */
const decodeTokenSafe = (token: string): { success: true; data: TokenPayload } | { success: false; error: unknown } => {
  try {
    const decryptedData = decrypt(decodeSearchParams(token), String(process.env.CRYPTO_SECRET_KEY));
    return {
      success: true,
      data: JSON.parse(decryptedData),
    };
  } catch (error) {
    console.warn(error);
    return {
      success: false,
      error,
    };
  }
};

/**
 * サインイン エンドポイント
 *
 * ユーザー認証を行い、有効なJWTトークンを生成、クッキーにセットします。
 *
 * @param {NextRequest} request - リクエストオブジェクト
 * @returns {NextResponse} - 認証結果を含むレスポンス
 */
export async function POST(request: NextRequest) {
  const { token } = await request.json();

  const decodeResult = decodeTokenSafe(token);
  if (!decodeResult.success) {
    console.warn('Token is invalid');
    return NextResponse.json({ error: 'Token is invalid' }, { status: HTTP_STATUS_CODES.UNAUTHORIZED });
  }

  const { userName, roleId, sessionKey, expireAt } = decodeResult.data;
  if (getCurrentDate().getTime() > expireAt) {
    console.warn(`Token has expired: userName=${userName}, roleId=${roleId}`);
    return NextResponse.json({ error: 'Token has expired' }, { status: HTTP_STATUS_CODES.FORBIDDEN });
  }

  // 認証処理
  const searchParams = new URLSearchParams({ userName, sessionKey });

  try {
    await apiClientForAuth.fetch<AuthResponse>('/auth/back/authenticate', { searchParams });
  } catch (error) {
    console.warn(error);
    return NextResponse.json({ error: 'User authentication failed' }, { status: HTTP_STATUS_CODES.UNAUTHORIZED });
  }

  // セッション生成
  const sessionMaxAge = parseInt(process.env.SESSION_MAX_AGE_SEC ?? DEFAULT_SESSION_MAX_AGE_SEC);
  const currentTime = Math.floor(getCurrentDate().getTime() / 1000);
  const sessionExpiryDate = currentTime + sessionMaxAge;
  const encodedJwtToken = await encode({
    token: {
      userName,
      roleId,
      sessionKey,
      type: systemType,
      jti: generateSessionId(),
      expire: sessionExpiryDate,
      //FIXME: 認可対応がマージされたタイミングで適切に設定されるため、いったん空配列でよい
      permissions: [],
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const sessionKeyName = process.env.NEXTAUTH_COOKIE_SESSION_KEY_NAME ?? getSessionKeyName(systemType);
  // クッキーセット
  registerSessionCookie(encodedJwtToken, { key: sessionKeyName, secure, sameSite });

  const response = NextResponse.json({ success: true });

  return response;
}
