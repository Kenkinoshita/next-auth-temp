import { z } from 'zod';

import { falseFlagSchema, trueFlagSchema, flagInterfaceSchema } from '@shared/schemas/flag';
import { noneInterface } from '@shared/schemas/noneInterface';
import type { NestedRequired } from '@shared/utils/utilityTypes';

const interfaceSchema = z.object({
  required: noneInterface(flagInterfaceSchema, flagInterfaceSchema),
  name: z.string(),
});

const notRequiredSchema = z.object({
  required: falseFlagSchema,
});

const requiredSchema = z.object({
  required: trueFlagSchema,
  name: z.string().min(1, '値をご入力ください。').max(50, '50文字以内でご入力ください。'),
});

/**
 * 「法人一覧登録.代理人届」の入力値を検証する
 */
export const corporationRepresentativeSchema = interfaceSchema.pipe(
  z.discriminatedUnion('required', [notRequiredSchema, requiredSchema]),
);

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationRepresentativeInput = NestedRequired<z.input<typeof corporationRepresentativeSchema>>;
export type CorporationRepresentative = z.output<typeof corporationRepresentativeSchema>;

export const CORPORATION_REPRESENTATIVE_INPUT_DEFAULT_VALUE: Readonly<CorporationRepresentativeInput> = {
  required: 'none',
  name: '',
};
