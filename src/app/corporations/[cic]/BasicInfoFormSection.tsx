import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { TextForm } from '@shared/components/TextForm/TextForm';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '基本情報';
const idPrefix = 'basicInfo';

type Props = {
  className?: string;
  registered: boolean;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function BasicInfoFormSection({ className, registered }: Props) {
  const { control } = useFormContext<CorporationInput>();

  return (
    <FormSection className={className} title={title}>
      <Controller
        name={'basicInfo.cic'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-cic`}
            type="text"
            label="CIC"
            disabled={registered}
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'basicInfo.name'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-name`}
            type="text"
            label="法人名（漢字）"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'basicInfo.kana'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-kana`}
            type="text"
            label="法人名（カナ）"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'basicInfo.note'}
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
