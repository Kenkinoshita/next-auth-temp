import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { HTTP_STATUS_CODES } from '@shared/consts/httpStatusCodes';
import { BACK_TOKEN_PAYLOAD_DEFAULT_VALUE } from '@shared/schemas/backTokenPayload';

/**
 * 認証セッション取得 エンドポイント
 *
 * 認証セッションを取得し、セッションが存在しない場合は認証エラーを返します。
 *
 * @returns {NextResponse} - 認証セッション情報またはエラーメッセージを含むレスポンス
 */
export async function GET() {
  if (process.env.IGNORED_SESSION === '1')
    return new NextResponse(
      JSON.stringify({
        user: BACK_TOKEN_PAYLOAD_DEFAULT_VALUE,
        expires: '',
      } satisfies Session),
      {
        status: HTTP_STATUS_CODES.OK,
      },
    );

  const session = await getServerSession(authOptions);

  if (!session) {
    console.warn('No session found, user not authenticated');
    return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
      status: HTTP_STATUS_CODES.UNAUTHORIZED,
    });
  }

  return new NextResponse(JSON.stringify(session.user), {
    status: HTTP_STATUS_CODES.OK,
  });
}
