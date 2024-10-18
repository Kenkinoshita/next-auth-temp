import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { fetchCorporations } from '@/service/corporations';
import { MONTH } from '@shared/consts/month';
import {
  parseCorporationSearchCondition,
  stringifyCorporationSearchCondition,
} from '@shared/features/corporation/corporationSearchCondition';
import type { CorporationSearchConditionInput } from '@shared/schemas/corporation/corporationSearchCondition';
import {
  CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE,
  corporationSearchConditionSchema,
} from '@shared/schemas/corporation/corporationSearchCondition';
import type { CorporationSearchResultInput } from '@shared/schemas/corporation/corporationSearchResult';
import type { CorporationSummaryInput } from '@shared/schemas/corporation/corporationSummary';
import { CORPORATION_SUMMARY_INPUT_DEFAULT_VALUE } from '@shared/schemas/corporation/corporationSummary';
import { toStrictKeys } from '@shared/utils/utilityFunction';

const months = toStrictKeys(MONTH);

const getMonths = (i: number) => {
  const month = months.at(i % 13);
  return month ? [month] : [];
};

/**
 * FIXME: 後で消す
 */
const MOCK_SEARCH_CONDITION_LIST = Array.from({ length: 42 }).map(
  (_, i): CorporationSummaryInput => ({
    ...CORPORATION_SUMMARY_INPUT_DEFAULT_VALUE,
    no: i + 1,
    cic: `${1000_000_000 + i}`,
    name: `法人名_${i + 1}`,
    kana: `ホウジンメイ_${i + 1}`,
    balanceStatementIssuingBankMonths: getMonths(i + 1),
    balanceStatementIssuingAuditingFirmMonths: getMonths(i + 3),
    transactionStatementIssuingMonths: getMonths(i + 7),
  }),
);

/**
 * FIXME: 後で消す
 */
const fetchMockSearchResult = async ({
  size,
  page,
}: CorporationSearchConditionInput): Promise<CorporationSearchResultInput> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: MOCK_SEARCH_CONDITION_LIST.length,
        pageNumber: +page,
        maxPage: 3,
        hasNext: +page !== 3,
        items: Array.from({ length: 3 }).map((_, i) => MOCK_SEARCH_CONDITION_LIST.slice(i * +size, (i + 1) * +size))[
          +page - 1
        ],
      } as CorporationSearchResultInput);
    }, 400);
  });
};

export const useSearchCorporations = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { input: previousInputValues, output: searchCondition } = useMemo(() => {
    // SearchParamsから検索条件を取得する
    const rowParams = parseCorporationSearchCondition(searchParams);
    const result = corporationSearchConditionSchema.safeParse(rowParams);
    if (!result.success) {
      return {
        input: CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE,
        output: corporationSearchConditionSchema.parse(CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE),
      };
    }
    return {
      input: rowParams as CorporationSearchConditionInput,
      output: result.data,
    };
  }, [searchParams]);

  // 検索APIを呼び出し、結果を返却する
  const {
    data: result,
    isLoading,
    isError,
  } = useSuspenseQuery({
    queryKey: REACT_QUERY_KEY.searchCorporations(previousInputValues),
    queryFn: () =>
      process.env.NEXT_PUBLIC_USE_MOCK_DATA === '1'
        ? fetchMockSearchResult(previousInputValues)
        : fetchCorporations(previousInputValues),
  });

  /** 検索条件を更新する */
  const updateSearchCondition = useCallback(
    (condition: CorporationSearchConditionInput) => {
      const params = stringifyCorporationSearchCondition(condition);
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

  return {
    result,
    isLoading,
    isError,
    updateSearchCondition,
    previousInputValues,
    searchCondition,
    updatePage,
  };
};
