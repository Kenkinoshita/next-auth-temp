import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { useDeleteQueryCache } from '@/hooks/useDeleteQueryCache';
import {
  createCorporation,
  deleteCorporation,
  fetchCorporationDetail,
  updateCorporation,
} from '@/service/corporations';
import { cicSchema } from '@shared/schemas/cic';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';
import { CORPORATION_INPUT_DEFAULT_VALUE } from '@shared/schemas/corporation/corporation';

const parseCic = (cicString: string) => {
  if (cicString === 'new') return 'new';
  const cicResult = cicSchema.safeParse(cicString);
  return cicResult.success ? cicResult.data : 'invalid';
};

const fetch = async (cic: string): Promise<CorporationInput> => {
  if (cic === 'new') {
    return CORPORATION_INPUT_DEFAULT_VALUE;
  }
  return await fetchCorporationDetail(cic);
};

/**
 * @param cic cic
 * @returns cicに紐づくデータとデータ登録、データ更新、データ削除の関数を提供する
 */
export const useCorporation = (cicString: string) => {
  const router = useRouter();

  const { deleteCache: deleteCorporationListCache } = useDeleteQueryCache({
    queryKey: REACT_QUERY_KEY.searchCorporations(),
  });

  const cic = parseCic(cicString);

  /** cicがnewの時は新規作成とみなす */
  const isNewCorporation = cic === 'new';

  const queryKey = REACT_QUERY_KEY.findCorporation(cic);

  const { deleteCache: deleteCorporationDetailCache } = useDeleteQueryCache({ queryKey });

  const { data: defaultValues } = useSuspenseQuery({
    queryKey,
    queryFn: () => fetch(cic),
  });

  const create = useCallback(
    async (input: CorporationInput) => {
      await createCorporation(input.basicInfo.cic, input);
      deleteCorporationListCache();
    },
    [deleteCorporationListCache],
  );

  const update = useCallback(
    async (input: CorporationInput) => {
      await updateCorporation(input.basicInfo.cic, input);
      deleteCorporationDetailCache();
      deleteCorporationListCache();
    },
    [deleteCorporationDetailCache, deleteCorporationListCache],
  );

  const remove = useCallback(
    async (cic: string) => {
      await deleteCorporation(cic);
      deleteCorporationListCache();
    },
    [deleteCorporationListCache],
  );

  useEffect(() => {
    if (cic !== 'invalid') {
      return;
    }

    router.replace('/error');
  }, [cic, router]);

  return { create, update, remove, defaultValues, isNewCorporation } as const;
};
