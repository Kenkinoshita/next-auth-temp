import type { TokenPayload } from '@shared/schemas/tokenPayload';
import { jsonSafeParse } from '@shared/utils/utilityFunction';
import type { ObjectLike } from '@shared/utils/utilityTypes';

/**
 * tokenPayloadをクエリパラメータで使用できる形にする
 * @param tokenPayload - 生のtokenPayload
 * @returns クエリパラメータ用に変換したtokenPayload
 */
export const transformTokenPayloadToSearchParams = (tokenPayload: TokenPayload): string => JSON.stringify(tokenPayload);

/**
 * クエリパラメータから取得したtokenPayloadをデコードする
 * @param encodedTokenPayload - クエリパラメータからURIエンコードされたtokenPayload
 * @returns デコードされたtokenPayload
 */
export const transformTokenPayloadFromSearchParams = (encodedTokenPayload: string): ObjectLike | null => {
  const decodedTokenPayload = decodeSearchParams(encodedTokenPayload);
  const { success, data } = jsonSafeParse(decodedTokenPayload);
  return success ? data : null;
};

/**
 * クエリパラメータをデコードする
 * @param encodedParam - URIエンコードされたクエリパラメータ
 * @returns デコードされたクエリパラメータ
 * FIXME: 後でいい感じにすること。
 */
export const decodeSearchParams = (encodedParam: string): string =>
  new URLSearchParams(`param=${encodedParam}`).get('param') ?? '';
