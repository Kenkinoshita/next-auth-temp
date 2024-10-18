import { Controller, useFormContext } from 'react-hook-form';

import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { FEE_BILLING_METHOD_ITEMS } from '@shared/consts/feeBillingMethod';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '総合振込・給与振込・賞与振込情報';
const idPrefix = 'generalSalaryBonus';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function GeneralSalaryBonusFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'transferInfo.generalSalaryBonus.feeBillingMethod'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-feeBillingMethod`}
            items={FEE_BILLING_METHOD_ITEMS}
            title="振込手数料引落口座"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
      <Fieldset title={'引落口座'} titlePrefix="required">
        <Controller
          name={'transferInfo.generalSalaryBonus.feeAccount.branchNumber'}
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
          name={'transferInfo.generalSalaryBonus.feeAccount.number'}
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
    </FormSection>
  );
}
