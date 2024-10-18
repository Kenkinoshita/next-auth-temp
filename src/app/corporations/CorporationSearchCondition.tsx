import { Controller, useFormContext } from 'react-hook-form';

import { ButtonForSearch } from '@shared/components/ButtonForSearch/ButtonForSearch';
import { CheckboxForm } from '@shared/components/CheckboxForm/CheckboxForm';
import { CheckboxUnController } from '@shared/components/CheckboxUnController';
import { PulldownForm } from '@shared/components/PulldownForm/PulldownForm';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { CORPORATION_CANCELLATION_DATE_ITEMS } from '@shared/consts/corporationCancellationDateChoice';
import { FEE_BILLING_METHOD_ITEMS } from '@shared/consts/feeBillingMethod';
import { MONTH_WITH_NONE_ITEMS } from '@shared/consts/month';
import type { CorporationSearchConditionInput } from '@shared/schemas/corporation/corporationSearchCondition';

const idPrefix = 'corp-search-condition';

type Props = {
  className?: string;
  onClickSearch: () => void;
};

export function CorporationSearchCondition({ className, onClickSearch }: Props) {
  const { control } = useFormContext<CorporationSearchConditionInput>();
  return (
    <div className={`px-2 ${className || ''}`}>
      <form className="space-y-4">
        <Controller
          name="cic"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextForm id={`${idPrefix}-cic`} type="text" label="CIC" errorMessage={error?.message} {...field} />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextForm id={`${idPrefix}-name`} type="text" label="法人名" errorMessage={error?.message} {...field} />
          )}
        />
        <Controller
          name="kana"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextForm
              id={`${idPrefix}-kana`}
              type="text"
              label="法人名（カナ）"
              errorMessage={error?.message}
              {...field}
            />
          )}
        />
        <CheckboxUnController
          control={control}
          name="feeBillingMethods"
          render={({ field, fieldState: { error } }) => (
            <CheckboxForm
              idPrefix={`${idPrefix}-fee-billing-method`}
              title="総給賞の振込手数料引落口座"
              items={FEE_BILLING_METHOD_ITEMS}
              errorMessage={error?.message}
              {...field}
              selectedIds={field.value}
            />
          )}
        />

        <Controller
          name="balanceStatementIssuingBankMonth"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PulldownForm
              id={`${idPrefix}-bank-month`}
              label="残高証明書（銀行様式）の発行月"
              items={MONTH_WITH_NONE_ITEMS}
              errorMessage={error?.message}
              selectedId={field.value}
              {...field}
            />
          )}
        />
        <Controller
          name="balanceStatementIssuingAuditingFirmMonth"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PulldownForm
              id={`${idPrefix}-auditing-firm-month`}
              label="残高証明書（監査法人様式）の発行月"
              items={MONTH_WITH_NONE_ITEMS}
              errorMessage={error?.message}
              selectedId={field.value}
              {...field}
            />
          )}
        />
        <Controller
          name="transactionStatementIssuingMonth"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PulldownForm
              id={`${idPrefix}-transaction-month`}
              label="取引明細書の発行月"
              items={MONTH_WITH_NONE_ITEMS}
              errorMessage={error?.message}
              selectedId={field.value}
              {...field}
            />
          )}
        />
        <Controller
          name={'cancellationDate'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <RadioButtonForm
              idPrefix={`${idPrefix}-cancellationDate`}
              direction="column"
              items={CORPORATION_CANCELLATION_DATE_ITEMS}
              title="解約状況"
              errorMessage={error?.message}
              {...field}
              selectedId={field.value}
            />
          )}
        />
      </form>
      <div className="flex items-center justify-center p-10">
        <ButtonForSearch label="検索" type="submit" onClick={onClickSearch} />
      </div>
    </div>
  );
}
