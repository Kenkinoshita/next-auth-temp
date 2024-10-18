'use client'; // FIXME: 後で切り出す

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { SearchConditionSection } from '@/app/ledgersManagement/searchConditionSection';
import { useSearchLedgerManagement } from '@/app/ledgersManagement/useSearchLedgerManagement';
import { ButtonLink } from '@shared/components/ButtonLink/ButtonLink';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';
import { Pagination } from '@shared/components/Pagination/Pagination';
import { Table } from '@shared/components/Table/Table';
import { ledgerManagementSearchConditionSchema } from '@shared/schemas/ledger/management/ledgerManagement';
import { toSearchParams } from '@shared/utils/utilityFunction';

const header = {
  no: { name: '#', order: 0 },
  action: { name: '', order: 1 },
  cic: { name: 'CIC', order: 2 },
  corporationName: { name: '法人名', order: 3 },
  createdDate: { name: '発行日', order: 4 },
  documentTypeName: { name: '帳票名', order: 5 },
};

/**
 * 帳票管理_一覧画面
 */
function Page() {
  const { previousInputValues, updateSearchCondition, result, updatePage } = useSearchLedgerManagement();
  const items = useMemo(() => {
    return result.items.map(({ no, cic, documentTypeCode, documentTypeName, createdDate, corporationName }) => {
      const detailCondition = {
        cic,
        createdDate,
        type: documentTypeCode,
        page: 1,
        size: 5,
      };
      const params = new URLSearchParams(toSearchParams(detailCondition));
      const item = {
        no,
        action: (
          <ButtonLink className="px-2" type="button" variant="corporate" href={`/ledgersManagement/detail?${params}`}>
            詳細
          </ButtonLink>
        ),
        cic,
        corporationName,
        createdDate,
        documentTypeName,
      };
      return item;
    });
  }, [result.items]);

  // FIXME: useAppFormを作成し、置き換える
  const methods = useForm({
    resolver: zodResolver(ledgerManagementSearchConditionSchema),
    // defaultValues: LEDGER_MANAGEMENT_SEARCH_CONDITION_DEFAULT_VALUE,
    defaultValues: previousInputValues,
  });
  const { handleSubmit, getValues } = methods;

  const onClickSearch = useCallback(() => {
    void handleSubmit(
      () => {
        const inputValues = getValues();
        updateSearchCondition({ ...inputValues, page: '1' });
      },
      (e) => {
        // FIXME: エラーハンドリングを追加する
        console.error(e);
      },
    )();
  }, [getValues, handleSubmit, updateSearchCondition]);
  return (
    <>
      <PageTitle className="mb-6 mt-10" title={PAGE_TITLE_NAMES.LEDGER_MANAGEMENT} subTitle="一覧" as="h2" />
      <div className="[&>*]:mx-2.5 [&>*]:max-w-content-max [&>*]:content-max:mx-auto">
        <ContentsPaper className="mb-8 max-w-content-max px-8 py-4 text-gray-dark">
          <FormProvider {...methods}>
            <SearchConditionSection onClickSearch={onClickSearch} />
          </FormProvider>
          <div className="flex flex-col-reverse justify-between sm:flex-row sm:items-center">
            <p className="mb-2">
              表示件数:<span className="ml-1">{result.total}</span>件
            </p>
          </div>
          <div>
            <Table className="mb-8" header={header} data={items} />
          </div>
          <Pagination currentPage={result.pageNumber} maxPage={result.maxPage} onChange={updatePage} />
        </ContentsPaper>
      </div>
    </>
  );
}

export default Page;
