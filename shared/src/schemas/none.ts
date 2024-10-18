import { z } from 'zod';

/**
 * Unionの文字列配列にnoneの文字列を追加する
 */
export const noneSchema = <T extends z.ZodUnionOptions, K extends z.ZodUnion<T>>(schema: K) =>
  schema.or(z.literal('none'));
