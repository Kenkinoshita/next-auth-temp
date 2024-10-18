import { z } from 'zod';

import { postalCodeSchema } from '@shared/schemas/postalCode';
import type { NestedRequired } from '@shared/utils/utilityTypes';

/**
 * 「法人一覧登録.送付先住所」の入力値を検証する
 */
export const corporationDestinationAddressSchema = z.object({
  corporationName: z.string().min(1, '値をご入力ください。').max(38, '38文字以内でご入力ください。'),
  name: z.string().min(1, '値をご入力ください。').max(38, '38文字以内でご入力ください。'),
  honorificTitle: z.string().min(1, '値をご入力ください。').max(4, '4文字以内でご入力ください。'),
  postalCode: postalCodeSchema,
  address: z.string().min(1, '値をご入力ください。').max(43, '43文字以内でご入力ください。'),
  buildingName: z.string().min(1, '値をご入力ください。').max(43, '43文字以内でご入力ください。'),
  phoneNumber: z.string().min(1, '値をご入力ください。').max(11, '11文字以内でご入力ください。'),
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationDestinationAddressInput = NestedRequired<z.input<typeof corporationDestinationAddressSchema>>;
export type CorporationDestinationAddress = z.output<typeof corporationDestinationAddressSchema>;

export const CORPORATION_DESTINATION_ADDRESS_INPUT_DEFAULT_VALUE: Readonly<CorporationDestinationAddressInput> = {
  corporationName: '',
  name: '',
  honorificTitle: '',
  postalCode: '',
  address: '',
  buildingName: '',
  phoneNumber: '',
};
