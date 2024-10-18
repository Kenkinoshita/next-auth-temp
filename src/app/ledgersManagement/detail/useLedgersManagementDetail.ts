import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useLedgersManagementDetailQueryValidation } from '@/app/ledgersManagement/detail/useLedgersManagementDetailQueryValidation';
import { deletePDF } from '@/service/ledgersPDFDeleteForBack';
import { insertPDF } from '@/service/ledgersPDFInsertForBack';
import type { LedgerPrimaryKeysInput } from '@shared/schemas/ledger/ledgerPrimaryKeys';
import type { LedgerManagementDetailConditionTableInput } from '@shared/schemas/ledger/management/ledgerManagementDetailCondition';
import type { LedgerPDFInsertInput } from '@shared/schemas/ledger/management/ledgerPDFInsert';
import { toSearchParams } from '@shared/utils/utilityFunction';

type Props = {
  deleteCache: () => void;
};

export const useLedgersManagementDetail = ({ deleteCache }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { validatedParams } = useLedgersManagementDetailQueryValidation();

  /** 検索条件を更新する */
  const updateSearchCondition = useCallback(
    (condition: LedgerManagementDetailConditionTableInput) => {
      const params = new URLSearchParams(toSearchParams(condition));
      router.replace(`${pathname}?${params}`);
    },
    [pathname, router],
  );

  /** 表示ページ数を更新する */
  const updatePage = useCallback(
    (page: number) => {
      updateSearchCondition({ ...validatedParams, page: `${page}` });
    },
    // FIXME: conditionalTableResultはuseRef経由で十分なので、修正する
    [validatedParams, updateSearchCondition],
  );

  const { isPending: isRemoving, mutateAsync: removeRecord } = useMutation({
    mutationFn: deletePDF,
    onSuccess: deleteCache,
  });
  const onRemoveRecord = useCallback(
    async (payload: LedgerPrimaryKeysInput) => {
      await removeRecord(payload);

      // FIXME: 帳票の取り下げ後、画面表示情報の再取得が行われない為、PDF登録後、表示情報の再取得が必ず行われるようにする。
      updateSearchCondition({ ...validatedParams, page: '1' });
    },
    [updateSearchCondition, validatedParams, removeRecord],
  );

  const { isPending: isUploading, mutateAsync: uploadPDF } = useMutation({
    mutationFn: insertPDF,
    onSuccess: deleteCache,
  });

  const onUploadPDF = useCallback(
    async (payload: LedgerPDFInsertInput) => {
      await uploadPDF(payload);
      // FIXME: PDF登録後、画面表示情報の再取得が行われない為、PDF登録後、表示情報の再取得が必ず行われるようにする。
      // おそらくはクエリストリング等に差異がないために情報の再取得の関数が呼ばれていないと思われる
      updateSearchCondition({ ...validatedParams, page: '1' });
    },
    [updateSearchCondition, validatedParams, uploadPDF],
  );

  return { updatePage, isRemoving, onRemoveRecord, isUploading, onUploadPDF };
};
