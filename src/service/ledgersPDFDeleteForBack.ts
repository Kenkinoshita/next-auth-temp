import { apiClient } from '@/service/apiClient';
import type { SucceededResponse } from '@shared/consts/succeededResponse';
import type { LedgerPrimaryKeysInput } from '@shared/schemas/ledger/ledgerPrimaryKeys';

/**
 * 帳票管理_詳細画面の帳票取り下げAPI
 * @param input
 * @returns
 */
export const deletePDF = async ({
  cic,
  type,
  createdDate,
  version,
}: LedgerPrimaryKeysInput): Promise<SucceededResponse> => {
  const res = await apiClient.delete<SucceededResponse>('/ledgersManagement/[cic]/[type]/[createdDate]/[version]', {
    pathParams: { cic, type, createdDate, version: String(version) },
  });
  return res;
};
