import { useContext } from 'react';

import { dialogContext } from '@shared/components/Dialog/dialogContext';

export function useDialog() {
  return useContext(dialogContext);
}
