'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Fragment, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';
import { BalanceStatementFormSection } from '@/app/corporations/[cic]/BalanceStatementFormSection';
import { BasicInfoFormSection } from '@/app/corporations/[cic]/BasicInfoFormSection';
import { CancellationDateFormSection } from '@/app/corporations/[cic]/CancellationDateFormSection';
import { CertificateOfDepositFormSection } from '@/app/corporations/[cic]/CertificateOfDepositFormSection';
import { DestinationAddressFormSection } from '@/app/corporations/[cic]/DestinationAddressFormSection';
import { FeeWithdrawalRequestFormSection } from '@/app/corporations/[cic]/FeeWithdrawalRequestFormSection';
import { GeneralSalaryBonusFormSection } from '@/app/corporations/[cic]/GeneralSalaryBonusFormSection';
import { HeadquartersTransferFormSection } from '@/app/corporations/[cic]/HeadquartersTransferFormSection';
import { NickNameFormSection } from '@/app/corporations/[cic]/NickNameFormSection';
import { RepresentativeFormSection } from '@/app/corporations/[cic]/RepresentativeFormSection';
import { TransactionStatementFormSection } from '@/app/corporations/[cic]/TransactionStatementFormSection';
import { UsedPortalFormSection } from '@/app/corporations/[cic]/UsedPortalFormSection';
import { useCorporation } from '@/app/corporations/useCorporation';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog/DeleteConfirmDialog';
import { Button } from '@shared/components/Button/Button';
import { ButtonLink } from '@shared/components/ButtonLink/ButtonLink';
import { ContentsPaper } from '@shared/components/ContentsPaper/ContentsPaper';
import { PageTitle } from '@shared/components/PageTitle/PageTitle';
import { useDialog } from '@shared/hooks/useDialog';
import { useThrowError } from '@shared/hooks/useThrowError';
import { corporationSchema } from '@shared/schemas/corporation/corporation';

/**
 * 法人一覧 - 登録/修正/確認画面
 */
function Page({ params: { cic } }: { params: { cic: string } }) {
  const { throwError } = useThrowError();
  const { showCustomDialog } = useDialog();

  const router = useRouter();
  const { defaultValues, create, update, remove, isNewCorporation } = useCorporation(cic);

  // FIXME: useAppFormを作成し、置き換える
  const methods = useForm({
    resolver: zodResolver(corporationSchema),
    defaultValues,
  });
  const { handleSubmit, getValues } = methods;

  const onClickRegister = useCallback(() => {
    void handleSubmit(
      async () => {
        try {
          await create(getValues());
          router.replace('/corporations');
        } catch (error) {
          console.error(error);

          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 409:
                window.alert('既に登録されたCICです。再度入力してください。');
                return;
            }
          }

          if (error instanceof Error) throwError(error);
        }
      },
      (e) => {
        // FIXME: エラーハンドリングを追加する
        console.error('----------------error-----------------', e);
      },
    )();
  }, [handleSubmit, create, getValues, throwError, router]);

  const onClickUpdate = useCallback(() => {
    void handleSubmit(
      async ({ basicInfo: { cic } }) => {
        try {
          await update(getValues());
          router.replace(`/corporations/${cic}`);
        } catch (error) {
          console.error(error);

          if (error instanceof Error) throwError(error);
        }
      },
      (e) => {
        // FIXME: エラーハンドリングを追加する
        console.error('----------------error-----------------', e);
      },
    )();
  }, [handleSubmit, update, getValues, throwError, router]);

  const onClickRemove = useCallback(async () => {
    const result = await showCustomDialog<'ok' | 'cancel'>((resolver) => (
      <DeleteConfirmDialog
        title="削除しますか？"
        onOk={() => {
          resolver('ok');
        }}
        onCancel={() => resolver('cancel')}
        okLabel="削除する"
        cancelLabel="キャンセル"
      />
    ));

    if (result !== 'ok') {
      return;
    }

    try {
      await remove(cic);
      router.replace('/corporations');
    } catch (error) {
      console.error(error);

      if (error instanceof Error) throwError(error);
    }
  }, [showCustomDialog, remove, throwError, cic, router]);

  return (
    <>
      <PageTitle
        className="mb-6 mt-10"
        title={PAGE_TITLE_NAMES.CORPORATE_LIST}
        subTitle={isNewCorporation ? '新規登録' : '詳細'}
        as="h2"
      />
      <div className="[&>*]:mx-2.5 [&>*]:max-w-content-max [&>*]:content-max:mx-auto">
        <ContentsPaper className="mb-8 px-8 py-4 text-gray-dark">
          <div className="flex flex-col gap-4 [&>*]:py-4 [&>*]:sm:py-6">
            <FormProvider {...methods}>
              <BasicInfoFormSection registered={!isNewCorporation} />
              <CertificateOfDepositFormSection />
              <GeneralSalaryBonusFormSection />
              <FeeWithdrawalRequestFormSection />
              <HeadquartersTransferFormSection />
              <NickNameFormSection />
              <RepresentativeFormSection />
              <BalanceStatementFormSection />
              <TransactionStatementFormSection />
              <DestinationAddressFormSection />
              <UsedPortalFormSection />
              <CancellationDateFormSection />
            </FormProvider>
          </div>

          <div className="mb-4 mt-12 flex flex-col items-center justify-around gap-3 sm:flex-row [&>*]:min-w-44">
            <ButtonLink size="md" type="button" variant="grayOutline" href="/corporations">
              一覧画面に戻る
            </ButtonLink>

            {isNewCorporation ? (
              <Button type="button" variant="corporate" size="md" onClick={onClickRegister}>
                登録する
              </Button>
            ) : (
              <Fragment>
                <Button type="button" variant="corporate" size="md" onClick={onClickUpdate}>
                  更新する
                </Button>
                <Button type="button" variant="outline" size="md" onClick={onClickRemove}>
                  削除
                </Button>
              </Fragment>
            )}
          </div>
        </ContentsPaper>
      </div>
    </>
  );
}

export default Page;
