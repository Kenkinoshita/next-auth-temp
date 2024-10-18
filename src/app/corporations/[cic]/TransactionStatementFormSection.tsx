import { Controller, useFormContext } from 'react-hook-form';

import { CheckboxForm } from '@shared/components/CheckboxForm/CheckboxForm';
import { CheckboxUnController } from '@shared/components/CheckboxUnController';
import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { Watcher } from '@shared/components/Watcher/Watcher';
import { FEE_BILLING_METHOD_ITEMS } from '@shared/consts/feeBillingMethod';
import { MONTH_ITEMS } from '@shared/consts/month';
import { REQUIRED_OR_UNNECESSARY_ITEMS, YES_OR_NO_ITEMS } from '@shared/consts/yesOrNo';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '取引明細書';
const idPrefix = 'transactionStatement';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function TransactionStatementFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();

  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'transactionStatement.required'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-required`}
            direction="row"
            items={REQUIRED_OR_UNNECESSARY_ITEMS}
            title="取引明細書"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />

      <Watcher
        name="transactionStatement.required"
        control={control}
        render={({ fieldValue: required }) => {
          return (
            <>
              {required === 'true' && (
                <>
                  <CheckboxUnController
                    name="transactionStatement.months"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CheckboxForm
                        idPrefix={`${idPrefix}-months`}
                        direction="row"
                        items={MONTH_ITEMS}
                        title="発行月"
                        {...field}
                        selectedIds={field.value}
                        errorMessage={error?.message}
                        titlePrefix="required"
                      />
                    )}
                  />
                  <Controller
                    name={'transactionStatement.requiredFeeNotification'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioButtonForm
                        idPrefix={`${idPrefix}-requiredFeeNotification`}
                        direction="row"
                        items={REQUIRED_OR_UNNECESSARY_ITEMS}
                        title="手数料通知書"
                        errorMessage={error?.message}
                        {...field}
                        selectedId={field.value}
                        titlePrefix="required"
                      />
                    )}
                  />
                  <Controller
                    name={'transactionStatement.feeBillingMethod'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioButtonForm
                        idPrefix={`${idPrefix}-feeBillingMethod`}
                        items={FEE_BILLING_METHOD_ITEMS}
                        title="手数料徴求方法"
                        errorMessage={error?.message}
                        {...field}
                        selectedId={field.value}
                        titlePrefix="required"
                      />
                    )}
                  />
                  <Fieldset title={'引落口座'} titlePrefix="optional">
                    <Controller
                      name={'transactionStatement.feeAccount.branchNumber'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextForm
                          id={`${idPrefix}-feeAccount-branchNumber`}
                          className="mb-3"
                          type="numberLike"
                          label="店番"
                          errorMessage={error?.message}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={'transactionStatement.feeAccount.number'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextForm
                          id={`${idPrefix}-feeAccount-number`}
                          type="numberLike"
                          label="口座番号"
                          errorMessage={error?.message}
                          {...field}
                        />
                      )}
                    />
                  </Fieldset>
                  <Controller
                    name={'transactionStatement.hasFeeExemption'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioButtonForm
                        idPrefix={`${idPrefix}-hasFeeExemption`}
                        direction="row"
                        items={YES_OR_NO_ITEMS}
                        title="減免"
                        errorMessage={error?.message}
                        {...field}
                        selectedId={field.value}
                        titlePrefix="required"
                      />
                    )}
                  />
                </>
              )}
            </>
          );
        }}
      />
      <Controller
        name={'transactionStatement.notes'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-notes`}
            type="text"
            label="特記事項"
            errorMessage={error?.message}
            {...field}
            labelPrefix="optional"
          />
        )}
      />
    </FormSection>
  );
}
