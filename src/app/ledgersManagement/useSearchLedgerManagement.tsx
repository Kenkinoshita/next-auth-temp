import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { fetchSearchLedgersForBack } from '@/service/fetchLedgersForBack';
import {
  LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE,
  ledgerManagementSearchConditionSchema,
} from '@shared/schemas/ledger/management/ledgerManagement';
import type { LedgerManagementSearchConditionInput } from '@shared/schemas/ledger/management/ledgerManagement';
import type { LedgerSearchResultInput } from '@shared/schemas/ledger/management/ledgerSearchResult';
import { toSearchParams } from '@shared/utils/utilityFunction';

const fetchSearchResult =
  (condition: LedgerManagementSearchConditionInput) => async (): Promise<LedgerSearchResultInput> =>
    fetchSearchLedgersForBack(condition);

export const useSearchLedgerManagement = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { input: previousInputValues } = useMemo(() => {
    const {
      responsibleDepartment: defaultResponsibleDepartment,
      cic: defaultCic,
      companyName: defaultCompanyName,
      isPartial: defaultIsPartial,
      amountRange: { min: defaultMin, max: defaultMax },
      createdDateRange: { start: defaultStart, end: defaultEnd },
      page: defaultPage,
      size: defaultSize,
    } = LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE;

    // SearchParamsから検索条件を取得する
    const rowParams = {
      responsibleDepartment: searchParams.get('responsibleDepartment') ?? defaultResponsibleDepartment,
      cic: searchParams.get('cic') ?? defaultCic,
      companyName: searchParams.get('companyName') ?? defaultCompanyName,
      isPartial: searchParams.get('isPartial') ?? defaultIsPartial,
      amountRange: { min: searchParams.get('min') ?? defaultMin, max: searchParams.get('max') ?? defaultMax },
      createdDateRange: {
        start: searchParams.get('start') ?? defaultStart,
        end: searchParams.get('end') ?? defaultEnd,
      },
      page: searchParams.get('page') ?? defaultPage,
      size: searchParams.get('size') ?? defaultSize,
    };

    const result = ledgerManagementSearchConditionSchema.safeParse(rowParams);
    if (!result.success) {
      const validOutput = LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE;
      return {
        input: LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE,
        output: ledgerManagementSearchConditionSchema.parse(validOutput),
      };
    }
    return {
      input: rowParams as LedgerManagementSearchConditionInput,
      output: result.data,
    };
  }, [searchParams]);

  // 検索APIを呼び出し、結果を返却する
  const {
    data: result,
    isLoading,
    isError,
  } = useSuspenseQuery({
    queryKey: REACT_QUERY_KEY.searchLedgerManagement(previousInputValues),
    queryFn: fetchSearchResult(previousInputValues),
  });

  /** 検索条件を更新する */
  const updateSearchCondition = useCallback(
    (condition: LedgerManagementSearchConditionInput) => {
      const params = new URLSearchParams(toSearchParams(condition));
      router.replace(`${pathname}?${params}`);
    },
    [pathname, router],
  );

  /** 表示ページ数を更新する */
  const updatePage = useCallback(
    (page: number) => {
      updateSearchCondition({ ...previousInputValues, page: `${page}` });
    },
    // FIXME: previousInputValuesはuseRef経由で十分なので、修正する
    [previousInputValues, updateSearchCondition],
  );

  return { result, isLoading, isError, previousInputValues, updateSearchCondition, updatePage };
};
