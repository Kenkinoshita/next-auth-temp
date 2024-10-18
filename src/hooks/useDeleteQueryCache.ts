import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type { ReactQueryKey } from '@/app/consts/reactQuery';

type Props = {
  queryKey: ReactQueryKey;
};

export const useDeleteQueryCache = ({ queryKey }: Props) => {
  const queryClient = useQueryClient();

  const deleteCache = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return { deleteCache };
};
