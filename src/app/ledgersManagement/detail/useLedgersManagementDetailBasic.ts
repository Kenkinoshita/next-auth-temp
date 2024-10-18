import { useSuspenseQuery } from '@tanstack/react-query';

import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { useDeleteQueryCache } from '@/hooks/useDeleteQueryCache';
import { fetchLedgersDetailBasic } from '@/service/fetchLedgersDetailForBack';
import type { LedgerManagementDetailConditionInput } from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import type { LedgerManagementDetailConditionResultInput } from '@shared/schemas/ledger/management/ledgerManagementDetailResult';

/** 詳細情報取得（基本情報） */
const fetchDetailBasicResult =
  (input: LedgerManagementDetailConditionInput) => async (): Promise<LedgerManagementDetailConditionResultInput> =>
    fetchLedgersDetailBasic(input);

export const useLedgersManagementDetailBasic = (validatedParams: LedgerManagementDetailConditionInput) => {
  const queryKey = REACT_QUERY_KEY.fetchLedgerManagementDetailCondition(validatedParams);
  const { deleteCache } = useDeleteQueryCache({ queryKey });
  const { data: ledgerBasicData } = useSuspenseQuery({
    queryKey,
    queryFn: fetchDetailBasicResult(validatedParams),
  });

  return {
    ledgerBasicData,
    deleteCache,
  };
};
