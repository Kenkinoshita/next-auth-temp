import { isAxiosError } from 'axios';

import type { LedgerManagementSearchConditionInput } from '@shared/schemas/ledger/management/ledgerManagement';
import {
  type LedgerSearchResult,
  type LedgerSearchResultInput,
  ledgerSearchResultSchema,
} from '@shared/schemas/ledger/management/ledgerSearchResult';
import { apiClient } from '@shared/service/apiClient';
import { AppError } from '@shared/utils/appError';
import { toSearchParams } from '@shared/utils/utilityFunction';

/**
 * 帳票管理の一覧画面へ表示する一覧情報を取得する
 * @param condition
 * @returns
 */
export const fetchSearchLedgersForBack = async (
  condition: LedgerManagementSearchConditionInput,
): Promise<LedgerSearchResult> => {
  try {
    const params = new URLSearchParams(toSearchParams(condition));
    const response = await apiClient.fetchForBrowser<LedgerSearchResultInput>(`ledgersManagement?${params}`);
    const data = ledgerSearchResultSchema.parse(response);
    return data;
  } catch (error) {
    //FIXME: 環境変数どうするか検討する
    // if (import.meta.env.DEV) {
    //   console.error(error);
    // }
    if (process.env.ENV === 'local') {
      console.error(error);
    }

    if (isAxiosError(error)) {
      //NOTE: axiosのエラーによってエラーページを分ける場合はここを書き換える
      throw new AppError('unknown');
    }

    throw new AppError('unknown');
  }
};
