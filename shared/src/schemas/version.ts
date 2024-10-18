import { z } from 'zod';

/**
 * バージョン番号を検証する
 * FIXME: バリデーションを修正する
 */
export const versionSchema = z.number().gte(1).lte(99).int();

// TODO: Propertyがoptionalになっているのを確認する
export type Version = z.output<typeof versionSchema>;
