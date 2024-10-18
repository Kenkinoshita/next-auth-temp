import { NextResponse } from 'next/server';

import { deleteSessionCookie } from '@shared/features/auth/session';

/**
 * サインアウト エンドポイント
 *
 * ユーザーの認証クッキーを削除し、サインアウト処理を行います。
 */
export async function POST() {
  const sessionKeyName = process.env.NEXTAUTH_COOKIE_SESSION_KEY_NAME;
  deleteSessionCookie(sessionKeyName);

  const response = NextResponse.json({ success: true });
  return response;
}
