import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { pageNumberSchema } from '@shared/schemas/pageNumber';
import { pageSizeSchema } from '@shared/schemas/pageSize';
import type { Expand } from '@shared/utils/utilityTypes';

const ledgerManagementDetail = {
  cic: cicSchema,
  createdDate: dateStringSchema,
  type: ledgerTypeSchema,
  page: pageNumberSchema,
  size: pageSizeSchema,
};

/**
 * 「帳票管理」の帳票管理_詳細画面の入力値を検証する
 */
export const ledgerManagementDetailSchema = z.object(ledgerManagementDetail);

export type LedgerManagementDetailInput = z.input<typeof ledgerManagementDetailSchema>;
export type LedgerManagementDetail = Expand<z.output<typeof ledgerManagementDetailSchema>>;

/**
 * 「帳票管理」の帳票管理_詳細画面の上部・共通情報を表示する際の入力値を検証する
 */
export const ledgerManagementDetailConditionSchema = ledgerManagementDetailSchema.pick({
  cic: true,
  createdDate: true,
  type: true,
});

export type LedgerManagementDetailConditionInput = z.input<typeof ledgerManagementDetailConditionSchema>;
export type LedgerManagementDetailCondition = Expand<z.output<typeof ledgerManagementDetailConditionSchema>>;

/**
 * 「帳票管理」の帳票管理_詳細画面の下部・帳票履歴情報を表示する際の入力値を検証する
 */
export const ledgerManagementDetailConditionTableSchema = ledgerManagementDetailSchema;

export type LedgerManagementDetailConditionTableInput = z.input<typeof ledgerManagementDetailConditionTableSchema>;
export type LedgerManagementDetailConditionTable = Expand<z.output<typeof ledgerManagementDetailConditionTableSchema>>;
