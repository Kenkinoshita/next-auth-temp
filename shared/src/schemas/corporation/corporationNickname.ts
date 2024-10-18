import { z } from 'zod';

import { falseFlagSchema, flagInterfaceSchema, trueFlagSchema } from '@shared/schemas/flag';
import { noneInterface } from '@shared/schemas/noneInterface';
import type { NestedRequired } from '@shared/utils/utilityTypes';

/** 正規表現（全角カタカナ＋長音記号） */
const regex = /^[ァ-ヴー]+$/;

const interfaceSchema = z.object({
  required: noneInterface(flagInterfaceSchema, flagInterfaceSchema),
  name: z.string(),
  kana: z.string(),
});
const requiredSchema = z.object({
  required: trueFlagSchema,
  name: z.string().min(1, '値をご入力ください。').max(70, '70文字以内でご入力ください。'),
  kana: z
    .string()
    .min(1, '値をご入力ください。')
    .max(100, '100文字以内でご入力ください。')
    .regex(regex, '全角カタカナでご入力ください。'),
});
const notRequiredSchema = z.object({
  required: falseFlagSchema,
});

/**
 * 「法人一覧登録.通名届」の入力値を検証する
 */
export const corporationNicknameSchema = interfaceSchema.pipe(
  z.discriminatedUnion('required', [requiredSchema, notRequiredSchema]),
);

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationNicknameInput = NestedRequired<z.input<typeof corporationNicknameSchema>>;
export type CorporationNickname = z.output<typeof corporationNicknameSchema>;

export const CORPORATION_NICKNAME_INPUT_DEFAULT_VALUE: Readonly<CorporationNicknameInput> = {
  required: 'none',
  name: '',
  kana: '',
};
