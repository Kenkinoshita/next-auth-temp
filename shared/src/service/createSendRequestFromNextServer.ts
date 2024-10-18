import { isAxiosError } from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken, encode } from 'next-auth/jwt';

import { HTTP_STATUS_CODES } from '@shared/consts/httpStatusCodes';
import {
  generateSessionId,
  isCookieSameSite,
  registerSessionCookie,
  isTokenExpired,
} from '@shared/features/auth/session';
import { NextApiError } from '@shared/utils/NextApiError';
import { getCurrentDate } from '@shared/utils/date';

type Options = {
  sessionKey: string;
  sessionMaxAge: number;
  cookieSecure: boolean;
  cookieSameSite: string;
  secretKey: string;
};

type SessionValidationResult = { invalid: true; message: string } | { invalid: false };

/**
 * セッションのチェックを行い更新するメソッド
 * @param {NextRequest} request - Next.js のリクエストオブジェクト
 * @returns {NextResponse} - トークンが無効の場合、更新されたセッション情報を含むレスポンスオブジェクト
 */
const extendSessionIfValid = async (
  request: NextRequest,
  { sessionKey, sessionMaxAge, cookieSecure, cookieSameSite, secretKey }: Options,
): Promise<SessionValidationResult> => {
  // 現在のセッショントークンを取得
  const token = await getToken({ req: request });
  if (!token) {
    // トークンが存在しない場合：認証されていない
    console.warn('No token found, user not authenticated');
    return {
      invalid: true,
      message: 'Not authenticated',
    };
  }

  const tokenExp = (token.expire as number) || 0;

  if (isTokenExpired(tokenExp)) {
    // トークンが期限切れの場合
    console.log('Session expired');
    return {
      invalid: true,
      message: 'Session expired',
    };
  }

  // 新しいセッションIDでトークンを再生成してクッキーを更新
  // 新しいJWTトークンを生成
  const nowTime = Math.floor(+getCurrentDate() / 1000);
  const newJwtToken = await encode({
    token: {
      ...token,
      jti: generateSessionId(), // 新しいセッションIDを生成
      expire: nowTime + sessionMaxAge, // 新しい有効期限をセッション有効期限から指定
    },
    secret: secretKey,
  });

  // 既存のセッションクッキーを削除し、新しいクッキーをセット
  registerSessionCookie(newJwtToken, {
    key: sessionKey,
    secure: cookieSecure,
    sameSite: isCookieSameSite(cookieSameSite) ? cookieSameSite : 'lax',
  });

  return {
    invalid: false,
  };
};

export const createSendRequestFromNextServer = (
  options: Options & {
    // TODO: 後で削除する
    ignoredSession?: boolean;
  },
) => {
  const sendRequestFromNextServer = async <T>(
    httpRequestFunction: () => Promise<T>,
    request: NextRequest,
  ): Promise<NextResponse<T | { message: string }>> => {
    try {
      if (!options.ignoredSession) {
        const result = await extendSessionIfValid(request, options);
        if (result.invalid) {
          return NextResponse.json({ message: result.message }, { status: HTTP_STATUS_CODES.UNAUTHORIZED });
        }
      }

      const response = await httpRequestFunction();
      const res = NextResponse.json(response ?? { message: 'success' });
      return res;
    } catch (error) {
      //TODO: 環境変数どうするか検討する
      if (process.env.ENV === 'local') {
        console.error('Request From Next Server is Failed.', error);
      }

      if (isAxiosError(error)) {
        const { response } = error;
        return NextResponse.json(
          { message: response?.data.message ?? 'Internal Server Error' },
          { status: response?.status ?? 500 },
        );
      }

      if (error instanceof NextApiError) {
        return NextResponse.json({ message: error.message }, { status: error.status });
      }

      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  };

  return sendRequestFromNextServer;
};
