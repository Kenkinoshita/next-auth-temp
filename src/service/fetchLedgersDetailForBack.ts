import { apiClient } from '@/service/apiClient';
import type {
  LedgerManagementDetailConditionInput,
  LedgerManagementDetailConditionTableInput,
} from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import type {
  LedgerManagementDetailConditionResultInput,
  LedgerManagementDetailConditionTableResultInput,
} from '@shared/schemas/ledger/management/ledgerManagementDetailResult';

/**
 * 帳票管理の詳細画面に表示する基本情報（画面上部）を取得する
 * @param input
 * @returns
 */
export const fetchLedgersDetailBasic = async ({ cic, type, createdDate }: LedgerManagementDetailConditionInput) => {
  const res = await apiClient.fetch<LedgerManagementDetailConditionResultInput>(
    '/ledgersManagement/detailBasic/[cic]/[type]/[createdDate]',
    { pathParams: { cic, type, createdDate } },
  );
  return res;
};

/**
 * 帳票管理の詳細画面に表示する帳票履歴情報（画面下部）を取得する
 * @param input
 * @returns
 */
export const fetchLedgersDetailTable = async ({
  cic,
  type,
  createdDate,
  page,
  size,
}: LedgerManagementDetailConditionTableInput) => {
  const res = await apiClient.fetch<LedgerManagementDetailConditionTableResultInput>(
    '/ledgersManagement/detailTable/[cic]/[type]/[createdDate]/[page]/[size]',
    { pathParams: { cic, type, createdDate, page, size } },
  );
  return res;
};
