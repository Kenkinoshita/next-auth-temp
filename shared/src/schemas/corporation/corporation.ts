import { z } from 'zod';

import {
  CORPORATION_BALANCE_STATEMENT_INPUT_DEFAULT_VALUE,
  corporationBalanceStatementSchema,
} from '@shared/schemas/corporation/corporationBalanceStatement';
import {
  CORPORATION_BASIC_INFO_INPUT_DEFAULT_VALUE,
  corporationBasicInfoSchema,
} from '@shared/schemas/corporation/corporationBasicInfo';
import {
  CORPORATION_CANCELLATION_DATE_DEFAULT_VALUE,
  corporationCancellationDateSchema,
} from '@shared/schemas/corporation/corporationCancellationDate';
import {
  CORPORATION_CERTIFICATE_OF_DEPOSIT_INPUT_DEFAULT_VALUE,
  corporationCertificateOfDepositSchema,
} from '@shared/schemas/corporation/corporationCertificateOfDeposit';
import {
  CORPORATION_DESTINATION_ADDRESS_INPUT_DEFAULT_VALUE,
  corporationDestinationAddressSchema,
} from '@shared/schemas/corporation/corporationDestinationAddress';
import {
  CORPORATION_NICKNAME_INPUT_DEFAULT_VALUE,
  corporationNicknameSchema,
} from '@shared/schemas/corporation/corporationNickname';
import {
  CORPORATION_REPRESENTATIVE_INPUT_DEFAULT_VALUE,
  corporationRepresentativeSchema,
} from '@shared/schemas/corporation/corporationRepresentative';
import {
  CORPORATION_TRANSACTION_STATEMENT_INPUT_DEFAULT_VALUE,
  corporationTransactionStatementSchema,
} from '@shared/schemas/corporation/corporationTransactionStatement';
import {
  CORPORATION_TRANSFER_INFO_INPUT_DEFAULT_VALUE,
  corporationTransferInfoSchema,
} from '@shared/schemas/corporation/corporationTransferInfo';
import { flagInterfaceSchema, flagSchema } from '@shared/schemas/flag';
import { noneInterface } from '@shared/schemas/noneInterface';
import type { NestedReadonly, NestedRequired } from '@shared/utils/utilityTypes';

/**
 * 「法人一覧登録」の入力値を検証する
 */
export const corporationSchema = z.object({
  basicInfo: corporationBasicInfoSchema,
  certificateOfDeposit: corporationCertificateOfDepositSchema,
  transferInfo: corporationTransferInfoSchema,
  nickname: corporationNicknameSchema,
  representative: corporationRepresentativeSchema,
  balanceStatement: corporationBalanceStatementSchema,
  transactionStatement: corporationTransactionStatementSchema,
  destinationAddress: corporationDestinationAddressSchema,
  usedPortal: noneInterface(flagSchema, flagInterfaceSchema),
  cancellationDate: z.literal('').or(corporationCancellationDateSchema),
});

// TODO: Propertyがoptionalになっているのを確認する
export type CorporationInput = NestedRequired<z.input<typeof corporationSchema>>;
export type Corporation = z.output<typeof corporationSchema>;

export const CORPORATION_INPUT_DEFAULT_VALUE: NestedReadonly<CorporationInput> = {
  basicInfo: CORPORATION_BASIC_INFO_INPUT_DEFAULT_VALUE,
  certificateOfDeposit: CORPORATION_CERTIFICATE_OF_DEPOSIT_INPUT_DEFAULT_VALUE,
  transferInfo: CORPORATION_TRANSFER_INFO_INPUT_DEFAULT_VALUE,
  nickname: CORPORATION_NICKNAME_INPUT_DEFAULT_VALUE,
  representative: CORPORATION_REPRESENTATIVE_INPUT_DEFAULT_VALUE,
  balanceStatement: CORPORATION_BALANCE_STATEMENT_INPUT_DEFAULT_VALUE,
  transactionStatement: CORPORATION_TRANSACTION_STATEMENT_INPUT_DEFAULT_VALUE,
  destinationAddress: CORPORATION_DESTINATION_ADDRESS_INPUT_DEFAULT_VALUE,
  usedPortal: 'none',
  cancellationDate: CORPORATION_CANCELLATION_DATE_DEFAULT_VALUE,
};

export const corporationListSchema = z.array(corporationSchema);

export type Corporations = z.output<typeof corporationListSchema>;
