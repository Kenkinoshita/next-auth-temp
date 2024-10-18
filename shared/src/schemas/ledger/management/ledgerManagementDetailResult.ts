import { z } from 'zod';

import { cicSchema } from '@shared/schemas/cic';
import { dateStringSchema } from '@shared/schemas/dateString';
import { flagSchema } from '@shared/schemas/flag';
import { ledgerNameSchema } from '@shared/schemas/ledger/ledgerName';
import { ledgerTypeSchema } from '@shared/schemas/ledger/ledgerType';
import { ledgerManagementDetailSummarySchema } from '@shared/schemas/ledger/management/ledgerManagementDetailSummary';
import { createPaginationSchema } from '@shared/schemas/pagination';
import { versionSchema } from '@shared/schemas/version';

/**
 * 「帳票管理」の帳票管理_詳細画面の上部・共通情報を表示する際のレスポンスを検証する
 */
export const ledgerManagementDetailConditionResultSchema = z.object({
  cic: cicSchema,
  companyName: z.string().min(1).max(100),
  createdDate: dateStringSchema,
  documentTypeName: ledgerNameSchema,
  documentTypeCode: ledgerTypeSchema,
  isPublished: flagSchema,
  isDeleted: flagSchema,
  latestVersion: versionSchema,
});

export type LedgerManagementDetailConditionResultInput = z.input<typeof ledgerManagementDetailConditionResultSchema>;
export type LedgerManagementDetailConditionResult = z.output<typeof ledgerManagementDetailConditionResultSchema>;

/**
 * 「帳票管理」の帳票管理_詳細画面の下部・帳票履歴情報を表示する際のレスポンスを検証する
 */
export const ledgerManagementDetailConditionTableResultSchema = createPaginationSchema(
  ledgerManagementDetailSummarySchema,
);

export type LedgerManagementDetailConditionTableResultInput = z.input<
  typeof ledgerManagementDetailConditionTableResultSchema
>;
export type LedgerManagementDetailConditionTableResult = z.output<
  typeof ledgerManagementDetailConditionTableResultSchema
>;
