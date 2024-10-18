import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { YES_OR_NO_ITEMS } from '@shared/consts/yesOrNo';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '譲渡性預金';
const idPrefix = 'certificateOfDeposit';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function CertificateOfDepositFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();

  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'certificateOfDeposit.hasDeposit'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-hasDeposit`}
            direction="row"
            items={YES_OR_NO_ITEMS}
            title="譲渡性預金"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
      <Controller
        name={'certificateOfDeposit.note'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-note`}
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
