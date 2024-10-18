'use client';

import { useCallback, useMemo } from 'react';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { REACT_QUERY_KEY } from '@/app/consts/reactQuery';
import { useLedgersManagementDetail } from '@/app/ledgersManagement/detail/useLedgersManagementDetail';
import { useLedgersManagementDetailBasic } from '@/app/ledgersManagement/detail/useLedgersManagementDetailBasic';
import { useLedgersManagementDetailQueryValidation } from '@/app/ledgersManagement/detail/useLedgersManagementDetailQueryValidation';
import { useLedgersManagementDetailTable } from '@/app/ledgersManagement/detail/useLedgersManagementDetailTable';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog/DeleteConfirmDialog';
import { useDeleteQueryCache } from '@/hooks/useDeleteQueryCache';
import { AppImage } from '@shared/components/AppImage/AppImage';
import { Button } from '@shared/components/Button/Button';
import { ButtonLink } from '@shared/components/ButtonLink/ButtonLink';
import { ButtonSlot } from '@shared/components/ButtonSlot/ButtonSlot';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { FileUploader } from '@shared/components/FileUploader/FileUploader';
import { InputDefinitionList } from '@shared/components/InputDefinitionList/InputDefinitionList';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';
import { Pagination } from '@shared/components/Pagination/Pagination';
import { Table } from '@shared/components/Table/Table';
import { useDialog } from '@shared/hooks/useDialog';
import { useThrowError } from '@shared/hooks/useThrowError';
import { Base64Manager } from '@shared/utils/Base64Manager';

const header = {
  no: { name: '#', order: 1 },
  createdDateTime: { name: '登録日時', order: 2 },
  isInvalidStatus: { name: 'ステータス', order: 3 },
  isDownloaded: { name: '顧客ダウンロード', order: 4 },
  action: { name: '発行書類', order: 4 },
};

/**
 * 帳票管理 - 詳細画面
 */
function Page() {
  const { deleteCache: deleteLedgerSearchCache } = useDeleteQueryCache({
    queryKey: REACT_QUERY_KEY.searchLedgerManagement(),
  });
  const { showCustomDialog } = useDialog();
  const { throwError } = useThrowError();
  const { validatedParams } = useLedgersManagementDetailQueryValidation();
  const basicValidatedParams = {
    cic: validatedParams.cic,
    createdDate: validatedParams.createdDate,
    type: validatedParams.type,
  };
  const { ledgerBasicData, deleteCache: deleteBasicCache } = useLedgersManagementDetailBasic(basicValidatedParams);
  const {
    ledgerTableData,
    onPDFDownload,
    isDownloading,
    deleteCache: deleteTableCache,
  } = useLedgersManagementDetailTable(validatedParams);
  const { updatePage, isRemoving, onRemoveRecord, isUploading, onUploadPDF } = useLedgersManagementDetail({
    deleteCache: () => {
      deleteLedgerSearchCache();
      deleteBasicCache();
      deleteTableCache();
    },
  });
  const { cic, companyName, createdDate, documentTypeName, isPublished, documentTypeCode, isDeleted, latestVersion } =
    ledgerBasicData;
  const items = useMemo(() => {
    const item = ledgerTableData.items.map(({ no, isDownloaded, isInvalidStatus, createdDateTime, version }) => ({
      no,
      createdDateTime,
      isInvalidStatus: isInvalidStatus === 'true' ? '取り下げ済み' : '有効',
      isDownloaded: isDownloaded === 'true' ? '済' : '未済',
      action: (
        <button
          type="button"
          onClick={() => {
            onPDFDownload({ cic, type: documentTypeCode, createdDate, version }).catch((e) => throwError(e));
          }}
          disabled={isDownloading}
          className={isDownloading ? 'cursor-not-allowed' : ''}
          aria-label={'帳票をダウンロードする'}
        >
          <AppImage className="mt-2 object-cover" width={30} height={31} src="/images/icon_pdf01.png" alt="" />
        </button>
      ),
    }));
    return item;
  }, [ledgerTableData.items, onPDFDownload, cic, documentTypeCode, createdDate, throwError, isDownloading]);

  const onClickRegister = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files?.[0];
    if (!file) return;

    const pdfBase64Manager = new Base64Manager('pdf');
    const encodedPdfData = await pdfBase64Manager.encodeForClient(file);
    onUploadPDF({ cic, type: documentTypeCode, createdDate, version: latestVersion, pdfData: encodedPdfData }).catch(
      (e) => throwError(e),
    );
  };

  const onClickRemove = useCallback(async () => {
    const result = await showCustomDialog<'ok' | 'cancel'>((resolver) => (
      <DeleteConfirmDialog
        title="取り下げますか？"
        onOk={() => {
          resolver('ok');
        }}
        onCancel={() => resolver('cancel')}
        okLabel="取り下げる"
        cancelLabel="キャンセル"
      />
    ));

    if (result === 'ok') {
      onRemoveRecord({ cic, type: documentTypeCode, createdDate, version: latestVersion }).catch((e) => throwError(e));
    }
  }, [showCustomDialog, onRemoveRecord, cic, documentTypeCode, createdDate, latestVersion, throwError]);

  const basicContents = useMemo(() => {
    return [
      { label: 'CIC', text: cic },
      { label: '法人名', text: companyName },
      { label: '発行日', text: createdDate },
      { label: '帳票名', text: documentTypeName },
      { label: '公開状態', text: isPublished === 'true' ? '顧客参照可' : '顧客参照不可' },
    ];
  }, [cic, companyName, createdDate, documentTypeName, isPublished]);

  return (
    <>
      <PageTitle className="mb-6 mt-10" title={PAGE_TITLE_NAMES.LEDGER_MANAGEMENT} subTitle="詳細" as="h2" />
      <div className="[&>*]:mx-2.5 [&>*]:max-w-content-max [&>*]:content-max:mx-auto">
        <ContentsPaper className="mb-8 max-w-content-max px-8 py-4 text-gray-dark">
          <InputDefinitionList className="p-2" contents={basicContents} />
          <div className="flex grow justify-end p-2">
            <AppImage
              className="inline-block object-cover"
              width={30}
              height={31}
              src="/images/icon_pdf01.png"
              alt="帳票pdfダウンロード"
            />
            <span className="mt-1 items-center text-sm">：ダウンロード可能</span>
          </div>
          <Table className="mb-8" data={items} header={header} />
          <Pagination
            currentPage={ledgerTableData.pageNumber}
            maxPage={ledgerTableData.maxPage}
            onChange={updatePage}
          />
          <form className="flex items-center justify-around p-10">
            <ButtonLink size="md" type="button" variant="grayOutline" href="/ledgersManagement">
              一覧画面に戻る
            </ButtonLink>

            {isDeleted === 'true' ? (
              <FileUploader
                id="file-uploader"
                name="file-uploader"
                onChange={onClickRegister}
                accept=".pdf"
                disabled={isUploading}
              >
                <ButtonSlot as="div" variant="corporate" size="md" className={isUploading ? 'cursor-not-allowed' : ''}>
                  <div>登録</div>
                </ButtonSlot>
              </FileUploader>
            ) : (
              <Button type="button" variant="outline" size="md" onClick={onClickRemove} disabled={isRemoving}>
                取り下げ
              </Button>
            )}
          </form>
        </ContentsPaper>
      </div>
    </>
  );
}

export default Page;
