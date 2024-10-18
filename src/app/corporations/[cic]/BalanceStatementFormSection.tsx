import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@shared/components/Checkbox/Checkbox';
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

const title = '残高証明書';
const idPrefix = 'balanceStatement';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function BalanceStatementFormSection({ className }: Props) {
  const { register, control, setValue } = useFormContext<CorporationInput>();

  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'balanceStatement.required'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-required`}
            direction="row"
            items={REQUIRED_OR_UNNECESSARY_ITEMS}
            title="残高証明書"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />

      <Watcher
        name="balanceStatement.required"
        control={control}
        render={({ fieldValue: required }) => (
          <>
            {required === 'true' && (
              <>
                {/* 銀行様式 */}
                <Watcher
                  name="balanceStatement.bankStyle.required"
                  control={control}
                  render={({ fieldValue: bankStyleRequired }) => (
                    <Fieldset title={'銀行様式'} titlePrefix="optional">
                      <Checkbox
                        id={`${idPrefix}-bankStyle-required`}
                        text=""
                        className="mb-2 mt-1"
                        value="true"
                        checked={bankStyleRequired === 'true'}
                        name={register('balanceStatement.bankStyle.required').name}
                        onChange={(e) => {
                          // NOTE: react-hook-form の管理外なので、setValueを利用する
                          setValue('balanceStatement.bankStyle.required', e.currentTarget.checked ? 'true' : 'false');
                        }}
                      />
                      {bankStyleRequired === 'true' && (
                        <CheckboxUnController
                          name="balanceStatement.bankStyle.months"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CheckboxForm
                              idPrefix={`${idPrefix}-bankStyle-months`}
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
                      )}
                    </Fieldset>
                  )}
                />
                {/* 監査法人様式 */}
                <Watcher
                  name="balanceStatement.auditingFirmStyle.required"
                  control={control}
                  render={({ fieldValue: auditingFirmStyleRequired }) => (
                    <Fieldset title={'監査法人様式'} titlePrefix="optional">
                      <Checkbox
                        id={`${idPrefix}-auditingFirmStyle-required`}
                        text=""
                        className="mb-2 mt-1"
                        value="true"
                        checked={auditingFirmStyleRequired === 'true'}
                        name={register('balanceStatement.auditingFirmStyle.required').name}
                        onChange={(e) => {
                          // NOTE: react-hook-form の管理外なので、setValueを利用する
                          setValue(
                            'balanceStatement.auditingFirmStyle.required',
                            e.currentTarget.checked ? 'true' : 'false',
                          );
                        }}
                      />
                      {auditingFirmStyleRequired === 'true' && (
                        <CheckboxUnController
                          name="balanceStatement.auditingFirmStyle.months"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CheckboxForm
                              idPrefix={`${idPrefix}-auditingFirmStyle-months`}
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
                      )}
                    </Fieldset>
                  )}
                />
                <Controller
                  name={'balanceStatement.requiredFeeNotification'}
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
                  name={'balanceStatement.feeBillingMethod'}
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
                    name={'balanceStatement.feeAccount.branchNumber'}
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
                    name={'balanceStatement.feeAccount.number'}
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
                  name={'balanceStatement.hasFeeExemption'}
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
        )}
      />
      <Controller
        name={'balanceStatement.notes'}
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
