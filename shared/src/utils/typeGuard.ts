import type { z } from 'zod';

export const isSchemaInput =
  <T extends z.Schema>(schema: T) =>
  (x: unknown): x is z.infer<typeof schema> =>
    schema.safeParse(x).success;

export const isLiteralUnion =
  <T extends string | number | boolean>(unionArray: T[]) =>
  (x: unknown): x is T =>
    unionArray.includes(x as T);
