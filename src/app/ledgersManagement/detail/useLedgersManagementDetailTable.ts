import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { useDeleteQueryCache } from '@/hooks/useDeleteQueryCache';
import { fetchLedgerPDFForBack } from '@/service/fetchLedgerPDFForBack';
import { fetchLedgersDetailTable } from '@/service/fetchLedgersDetailForBack';
import type { LedgerPDFSearchConditionInput } from '@shared/schemas/ledger/inquiry/ledgerPDFSearchCondition';
import type { LedgerManagementDetailConditionTableInput } from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import type { LedgerManagementDetailConditionTableResultInput } from '@shared/schemas/ledger/management/ledgerManagementDetailResult';
import { Base64Manager } from '@shared/utils/Base64Manager';
import { downloadFile } from '@shared/utils/utilityFunction';

/** 詳細情報取得（帳票履歴） */
const fetchDetailTableResult =
  (input: LedgerManagementDetailConditionTableInput) =>
  async (): Promise<LedgerManagementDetailConditionTableResultInput> =>
    fetchLedgersDetailTable(input);

export const useLedgersManagementDetailTable = (validatedParams: LedgerManagementDetailConditionTableInput) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const queryKey = REACT_QUERY_KEY.fetchLedgerManagementDetailConditionTable(validatedParams);
  const { deleteCache } = useDeleteQueryCache({ queryKey });

  const { data: ledgerTableData } = useSuspenseQuery({
    queryKey,
    queryFn: fetchDetailTableResult(validatedParams),
  });

  const onPDFDownload = useCallback(async (condition: LedgerPDFSearchConditionInput) => {
    setIsDownloading(true);
    try {
      const { pdfData: base64, fileName } = await fetchLedgerPDFForBack(condition);

      const pdfBase64manager = new Base64Manager('pdf');
      const pdf = await pdfBase64manager.decode(base64);
      downloadFile({ fileData: pdf, fileName });
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    ledgerTableData,
    onPDFDownload,
    isDownloading,
    deleteCache,
  };
};
