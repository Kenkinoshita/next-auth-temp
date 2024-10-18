import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { TextForm } from '@shared/components/TextForm/TextForm';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '送付先住所';
const idPrefix = 'destinationAddress';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function DestinationAddressFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <Controller
        name={'destinationAddress.corporationName'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-corporationName`}
            type="text"
            label="送付先法人名"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.name'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-name`}
            type="text"
            label="担当部署・担当者"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.honorificTitle'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-honorificTitle`}
            type="text"
            label="敬称"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.postalCode'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-postalCode`}
            type="text"
            label="郵便番号"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.address'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-address`}
            type="text"
            label="住所"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.buildingName'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-buildingName`}
            type="text"
            label="ビル名"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
      <Controller
        name={'destinationAddress.phoneNumber'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextForm
            id={`${idPrefix}-phoneNumber`}
            type="text"
            label="電話番号"
            errorMessage={error?.message}
            {...field}
            labelPrefix="required"
          />
        )}
      />
    </FormSection>
  );
}
