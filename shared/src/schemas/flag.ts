import { z } from 'zod';

export const flagInterfaceSchema = z.union([z.literal('true'), z.literal('false')]);
export const trueFlagSchema = z.literal('true').transform((): true => true);
export const falseFlagSchema = z.literal('false').transform((): false => false);

/**
 * 「要/不要」、「あり/なし」 などの入力値を検証する
 */
export const flagSchema = flagInterfaceSchema.pipe(z.union([trueFlagSchema, falseFlagSchema]));

export type FlagInput = z.input<typeof flagSchema>;
export type Flag = z.output<typeof flagSchema>;
