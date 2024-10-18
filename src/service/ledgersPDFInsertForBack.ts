import { apiClient } from '@/service/apiClient';
import type { SucceededResponse } from '@shared/consts/succeededResponse';
import type { LedgerPDFInsertInput } from '@shared/schemas/ledger/management/ledgerPDFInsert';

/**
 * 帳票管理_詳細画面の帳票登録API
 * @param input
 * @returns
 */
export const insertPDF = async (input: LedgerPDFInsertInput): Promise<SucceededResponse> => {
  const res = await apiClient.post<LedgerPDFInsertInput, SucceededResponse>('/ledgersManagement/pdfInsert', {
    body: input,
  });
  return res;
};
