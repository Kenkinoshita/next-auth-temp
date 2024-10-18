import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

import { SYSTEM_TYPE } from '@shared/consts/systemType';
import { getCurrentDate } from '@shared/utils/date';
import { isLiteralUnion } from '@shared/utils/typeGuard';

const DEFAULT_BACK_SESSION_KEY_NAME = 'next-auth.session-token.back';
const DEFAULT_PORTAL_SESSION_KEY_NAME = 'next-auth.session-token.portal';

/**
 * セッションクッキーを削除し、新しいクッキーを設定する
 * @param {string} newJwtToken - 新しいJWTトークン
 * @param {{ key: string, secure: boolean, sameSite: 'lax' | 'strict' | 'none' }} options - クッキー設定のオプション
 */
export const registerSessionCookie = (
  newJwtToken: string,
  { key, secure, sameSite }: { key: string; secure: boolean; sameSite: 'lax' | 'strict' | 'none' },
) => {
  deleteSessionCookie(key);
  cookies().set({
    name: key,
    value: newJwtToken,
    httpOnly: true,
    secure,
    path: '/',
    sameSite,
  });
};

/**
 * セッションクッキーを削除する
 * @param {string} key - セッションクッキーのキー
 */
export const deleteSessionCookie = (key: string) => {
  cookies().delete(key);
};

/**
 * ユニークなセッションIDを生成する
 * @returns {string} - 生成されたユニークなセッションID
 */
export const generateSessionId = (): string => {
  const sessionId = 'session_' + nanoid();
  return sessionId;
};

/**
 * SameSite クッキー属性の値を取得するヘルパー関数
 */
export const isCookieSameSite = isLiteralUnion(['lax', 'strict', 'none']);

/**
 * セッションキー名を取得する関数
 * @param {string} tokenType - トークンのタイプ ('back' または 'portal')
 * @returns {string} - セッションキー名
 */
export const getSessionKeyName = (tokenType: string): string => {
  return tokenType === SYSTEM_TYPE.back ? DEFAULT_BACK_SESSION_KEY_NAME : DEFAULT_PORTAL_SESSION_KEY_NAME;
};

/**
 * トークンが期限切れかどうかを判定します。
 *
 * @param tokenExpire - トークンの有効期限（UNIXタイムスタンプ）
 * @returns トークンが期限切れの場合は true、そうでない場合は false を返します。
 */
export const isTokenExpired = (tokenExpire: number): boolean => {
  const nowTime = Math.floor(+getCurrentDate() / 1000);
  return tokenExpire < nowTime;
};
