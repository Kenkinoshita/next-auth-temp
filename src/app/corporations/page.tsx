'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { CorporationSearchCondition } from '@/app/corporations/CorporationSearchCondition';
import { CorporationSearchResultTable } from '@/app/corporations/CorporationSearchResultTable';
import { useDownloadCsvFile } from '@/app/corporations/useDownloadCsvFile';
import { useSearchCorporations } from '@/app/corporations/useSearchCorporations';
import { Button } from '@shared/components/Button/Button';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';
import { Pagination } from '@shared/components/Pagination/Pagination';
import { useThrowError } from '@shared/hooks/useThrowError';
import { corporationSearchConditionSchema } from '@shared/schemas/corporation/corporationSearchCondition';

/**
 * 法人一覧 - 一覧画面
 */
function Page() {
  const { throwError } = useThrowError();

  const { updateSearchCondition, previousInputValues, result, updatePage, searchCondition } = useSearchCorporations();

  const { downloadCsvFile, isDownloading } = useDownloadCsvFile();

  // FIXME: useAppFormを作成し、置き換える
  const methods = useForm({
    resolver: zodResolver(corporationSearchConditionSchema),
    defaultValues: previousInputValues,
    // TODO: 後で修正する
    // defaultValues: CORPORATION_SEARCH_CONDITION_INPUT_DEFAULT_VALUE,
  });

  const { handleSubmit, getValues } = methods;

  const onClickSearch = useCallback(() => {
    void handleSubmit(
      () => {
        const inputValues = getValues();
        updateSearchCondition(inputValues);
      },
      (e) => {
        // FIXME: エラーハンドリングを追加する
        console.error(e);
      },
    )();
  }, [getValues, handleSubmit, updateSearchCondition]);

  const onClickDownloadEverything = useCallback(
    async () => await downloadCsvFile().catch((e) => throwError(e)),
    [throwError, downloadCsvFile],
  );

  const onClickDownloadSearchResults = useCallback(async () => {
    await downloadCsvFile(getValues()).catch((e) => throwError(e));
  }, [getValues, throwError, downloadCsvFile]);

  return (
    <>
      <PageTitle className="mb-6 mt-10" title={PAGE_TITLE_NAMES.CORPORATE_LIST} subTitle="一覧" as="h2" />
      <div className="[&>*]:mx-2.5 [&>*]:max-w-content-max [&>*]:content-max:mx-auto">
        <ContentsPaper className="mb-8 max-w-content-max px-8 py-4 text-gray-dark">
          <FormProvider {...methods}>
            <CorporationSearchCondition className="mb-4" onClickSearch={onClickSearch} />
          </FormProvider>
          <div className="flex flex-col-reverse justify-between sm:flex-row sm:items-center">
            <p className="mb-2">
              表示件数:<span className="ml-1">{result.total}</span>件
            </p>
            <div className="mb-2 flex flex-col flex-wrap items-center justify-end space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isDownloading}
                onClick={onClickDownloadEverything}
              >
                CSVダウンロード(全量)
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isDownloading}
                onClick={onClickDownloadSearchResults}
              >
                CSVダウンロード(検索結果)
              </Button>
            </div>
          </div>

          <CorporationSearchResultTable
            className="mb-8"
            searchCondition={searchCondition}
            results={
              // NOTE: ?は不要のはずだが、開発中まれにエラー画面になるため
              result?.items ?? []
            }
          />
          <Pagination currentPage={result.pageNumber} maxPage={result.maxPage} onChange={updatePage} />
        </ContentsPaper>
      </div>
    </>
  );
}

export default Page;
