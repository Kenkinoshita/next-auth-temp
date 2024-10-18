import { Controller, useFormContext } from 'react-hook-form';

import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { FEE_BILLING_METHOD_ITEMS_FOR_HEADQUARTERS } from '@shared/consts/feeBillingMethod';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '本部端末からの振込手数料';
const idPrefix = 'headquartersTransfer';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function HeadquartersTransferFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'transferInfo.headquartersTransfer.feeBillingMethod'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-feeBillingMethod`}
            items={FEE_BILLING_METHOD_ITEMS_FOR_HEADQUARTERS}
            title="振込手数料引落口座"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
      <Fieldset title={'引落口座'} titlePrefix="optional">
        <Controller
          name={'transferInfo.headquartersTransfer.feeAccount.branchNumber'}
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
          name={'transferInfo.headquartersTransfer.feeAccount.number'}
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
        name={'transferInfo.headquartersTransfer.feeAmount'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-feeAmount`}
            type="numberLike"
            label="手数料金額"
            errorMessage={error?.message}
            {...field}
            labelPrefix="optional"
          />
        )}
      />
      <Controller
        name={'transferInfo.headquartersTransfer.notes'}
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
