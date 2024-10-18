import { z } from 'zod';

import { flagInterfaceSchema, flagSchema } from '@shared/schemas/flag';
import { noneInterface } from '@shared/schemas/noneInterface';
import { notesSchema } from '@shared/schemas/notes';
import type { NestedRequired } from '@shared/utils/utilityTypes';

/**
 * 「法人一覧.譲渡性預金」の入力値を検証する
 */
export const corporationCertificateOfDepositSchema = z.object({
  hasDeposit: noneInterface(flagSchema, flagInterfaceSchema),
  note: notesSchema,
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationCertificateOfDepositInput = NestedRequired<
  z.input<typeof corporationCertificateOfDepositSchema>
>;
export type CorporationCertificateOfDeposit = z.output<typeof corporationCertificateOfDepositSchema>;

export const CORPORATION_CERTIFICATE_OF_DEPOSIT_INPUT_DEFAULT_VALUE: Readonly<CorporationCertificateOfDepositInput> = {
  hasDeposit: 'none',
  note: '',
};
