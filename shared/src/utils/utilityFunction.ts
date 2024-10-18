import type {
  Entries,
  ObjectLike,
  Keys,
  OneOrTwo,
  OneOrMore,
  Values,
  SearchCondition,
  NestedKey,
} from '@shared/utils/utilityTypes';

/**
 * いずれかの条件だけがtrueの場合、trueを返却する（論理和）
 * @param pred1 条件1
 * @param pred2 条件2
 * @returns 結果
 */
export const xor = (pred1: boolean, pred2: boolean): boolean => pred1 !== pred2;

export const toStrictEntries = <T extends ObjectLike>(obj: T) => Object.entries(obj) as Entries<T>;

export const toStrictKeys = <T extends ObjectLike>(obj: T) => Object.keys(obj) as Keys<T>;

export const toStrictValues = <T extends ObjectLike>(obj: T) => Object.values(obj) as Values<T>;

/**
 * 引数に渡した配列からkeyとvalueが一致するオブジェクトリテラルを返却する
 * @param keys プロパティに設定したい文字列など
 * @returns Enumと同じように扱えるオブジェクトリテラル
 */
export const toEnumLikeObject = <T extends PropertyKey>(keys: T[]): Readonly<{ [K in T]: K }> => {
  return keys.reduce(
    (acc, cur) => {
      acc[cur] = cur;
      return acc;
    },
    Object.create(null) as { [K in T]: K },
  );
};

/**
 * 配列からOneOrMoreの型に変換する。要素が1つもない場合はエラーを返却する。
 * @param arr 1つ以上の要素を持つ配列
 * @returns OneOrMore型の配列（型以外は変更なし）
 */
export const toOneOrMore = <T>(arr: T[]): OneOrMore<T> => {
  if (!arr.length) {
    throw TypeError('"toOneOrMore" argument array must have one or more elements.');
  }

  const [first, ...rest] = arr;
  return rest.length ? [first, ...rest] : [first];
};

/**
 * 配列からOneOrTwoの型に変換する。要素が1つもない場合はエラーを返却する。
 * @param arr 1つ以上の要素を持つ配列
 * @returns OneOrTwo型の配列（型以外は変更なし）
 */
export const toOneOrTwo = <T>(arr: T[]): OneOrTwo<T> => {
  if (!arr.length) {
    throw TypeError('"toOneOrTwo" argument array must have one or more elements.');
  }

  const [first, second] = arr;
  return arr.length > 1 ? [first, second] : [first];
};

/**
 * 配列でない値を配列に変換して返却する。配列の場合はそのまま値を返却する。
 * @param value 配列かもしれない値
 * @returns 配列を返却する
 */
export const toArrayIfNonArray = <T>(value: T) =>
  (Array.isArray(value) ? value : [value]) as T extends unknown[] ? T : T[];

/**
 * 文字列の先頭を大文字にした文字列を返却する
 * @param str （半角英数字のみの）文字列
 * @returns 先頭を大文字にした文字列を返却する
 */
export const toHeadUpperCase = <T extends string>(str: T) => {
  if (!str.length) {
    throw TypeError('"toHeadUpperCase" argument string must have one or more strings.');
  }
  if (!/^[0-9a-zA-Z]+$/.test(str)) {
    throw TypeError('"toHeadUpperCase" argument string must have only half-width alphanumeric characters strings.');
  }

  const [head, ...rest] = str.split('');
  return `${head.toUpperCase()}${rest.join('')}` as Capitalize<T>;
};

/**
 *  ネストした検索条件スキーマを、クエリパラメータとして使用しやすいようにネストした各要素についてフラットなオブジェクトに変換する。
 * FIXME: あとで適切な場所に移動させる
 * FIXME: 返り値の型が間違っているので修正すること（valueがオブジェクトだった場合、そのkeyは含めない型が正しい）
 * @param condition 検索条件オブジェクトスキーマ
 * @returns ネストが解消されたオブジェクトを返却する
 */
export const toSearchParams = <T extends SearchCondition>(condition: T) => {
  return toStrictKeys(condition).reduce(
    (acc: Record<NestedKey<T>, string>, key) => {
      const value = condition[key];
      if (Array.isArray(value)) {
        acc[key] = value.join(',');
      } else if (value !== null && typeof value === 'object') {
        // FIXME: 親のキーを連結するように修正
        Object.assign(acc, toSearchParams(value as SearchCondition));
      } else {
        acc[key] = value.toString();
      }
      return acc;
    },
    {} as Record<NestedKey<T>, string>,
  );
};

/**
 * ブラウザ上でファイルをダウンロードする際に使用する
 * FIXME: lambdaで使用できないので、適切な場所に移動させる
 * @param fileData Blob型のバイナリデータ
 * @param fileName ダウンロードするファイルのファイル名
 */
export const downloadFile = ({ fileData, fileName }: { fileData: Blob; fileName: string }): void => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(fileData);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

/**
 * 引数がJSON形式ではない場合でもエラーを投げるのではなく、nullを返すようにする
 * @param target - パースしたい対象
 * @returns パース後の値またはundefined
 */
export const jsonSafeParse = (target: unknown): { success: boolean; data: ObjectLike | null } => {
  if (typeof target !== 'string') return { success: false, data: null };
  try {
    const parsed = JSON.parse(target);
    return { success: true, data: parsed };
  } catch {
    return { success: false, data: null };
  }
};
