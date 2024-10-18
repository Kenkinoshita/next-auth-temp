import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

import { encrypt } from '@shared/features/auth/authCrypto';
import { getCurrentDate } from '@shared/utils/date';

const DEFAULT_EXPIRE_SEC = '10'; //クエリパラメタ有効期限（秒）

/**
 * ログイン エンドポイント
 *
 * 法人システムから、フォームデータを受け取り、必要な情報を取得して暗号化し、
 * 指定されたリダイレクトパスにトークンを付与してリダイレクトします。
 *
 * @param {NextRequest} req - リクエストオブジェクト
 * @returns {NextResponse} - レスポンスオブジェクト
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userName = formData.get('userName') as string | null;
  const sessionKey = formData.get('sessionKey') as string | null;
  const roleId = formData.get('roleId') as string | null;
  const key = formData.get('key') as string | null;

  if (!userName || !sessionKey || !roleId || !key) {
    console.error('Missing required form data: ', {
      userName,
      sessionKey,
      roleId,
      key,
    });
    return NextResponse.json({ error: 'Missing required form data' }, { status: 400 });
  }

  const decodeKey = atob(key);
  if (decodeKey !== `${sessionKey}${userName}`)
    return NextResponse.json({ error: 'Form value is invalid' }, { status: 400 });

  // 有効期限取得（秒単位）
  const expirationTime = parseInt(process.env.CRYPTO_QUERY_PARAM_EXPIRE_SEC || DEFAULT_EXPIRE_SEC, 10);
  const expireAt = getCurrentDate().getTime() + expirationTime * 1000;

  // クエリパラメタトークン作成して暗号化する
  const tokenData = JSON.stringify({ userName, sessionKey, roleId, expireAt });
  const token = encrypt(tokenData, String(process.env.CRYPTO_SECRET_KEY));

  // URLSearchParamsを使ってトークンをエンコード
  const params = new URLSearchParams({ token });

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  // ランディングページに遷移
  redirect(`${basePath}/landing?${params.toString()}`);
}
