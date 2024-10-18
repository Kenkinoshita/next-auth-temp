import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { corporationKanaSchema } from '@shared/schemas/corporation/corporationKana';
import { corporationNameSchema } from '@shared/schemas/corporation/corporationName';
import { notesSchema } from '@shared/schemas/notes';
import type { NestedRequired } from '@shared/utils/utilityTypes';

/**
 * 「法人一覧登録.基本情報」の入力値を検証する
 */
export const corporationBasicInfoSchema = z.object({
  cic: cicSchema,
  name: corporationNameSchema,
  kana: corporationKanaSchema,
  note: notesSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationBasicInfoInput = NestedRequired<z.input<typeof corporationBasicInfoSchema>>;
export type CorporationBasicInfo = z.output<typeof corporationBasicInfoSchema>;

export const CORPORATION_BASIC_INFO_INPUT_DEFAULT_VALUE: Readonly<CorporationBasicInfoInput> = {
  cic: '',
  name: '',
  kana: '',
  note: '',
};
