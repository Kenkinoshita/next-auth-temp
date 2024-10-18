import { z } from 'zod';

/**
 * RadioButton用のスキーマ
 * Unionの文字列配列にnoneの文字列を追加するが、検証時にはnoneを弾く
 * FIXME: 一旦interfaceSchemaを必須としておくが、後でオプショナルに治す
 */
export const noneInterface = <T extends z.ZodType, K extends z.ZodType>(schema: T, interfaceSchema: K) =>
  interfaceSchema.or(z.literal('none')).pipe(schema);
