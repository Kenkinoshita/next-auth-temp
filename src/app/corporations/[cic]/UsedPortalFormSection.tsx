import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { USED_OR_UNUSED_ITEMS } from '@shared/consts/yesOrNo';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = 'ポータル利用状況';
const idPrefix = 'usedPortal';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function UsedPortalFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();

  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'usedPortal'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}`}
            direction="row"
            items={USED_OR_UNUSED_ITEMS}
            title="利用状況"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
    </FormSection>
  );
}
