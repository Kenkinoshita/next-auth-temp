import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import type { LedgerManagementDetailInput } from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import { ledgerManagementDetailSchema } from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';

export const useLedgersManagementDetailQueryValidation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 詳細画面の入力値を検証する
  const validatedParams = useMemo(() => {
    const queryParams = {
      cic: searchParams.get('cic'),
      createdDate: searchParams.get('createdDate'),
      type: searchParams.get('type'),
      page: searchParams.get('page'),
      size: searchParams.get('size'),
    };
    const conditionData = ledgerManagementDetailSchema.safeParse(queryParams);
    if (!conditionData.success) {
      router.replace('/error');
    }
    return queryParams as LedgerManagementDetailInput;
  }, [router, searchParams]);

  return { validatedParams };
};
