import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { YES_OR_NO_ITEMS } from '@shared/consts/yesOrNo';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '総合振込に関する手数料引落依頼書';
const idPrefix = 'feeWithdrawalRequest';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function FeeWithdrawalRequestFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'transferInfo.feeWithdrawalRequest.requested'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-requested`}
            direction="row"
            items={YES_OR_NO_ITEMS}
            title="手数料引落依頼"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
      <Controller
        name={'transferInfo.feeWithdrawalRequest.notes'}
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
