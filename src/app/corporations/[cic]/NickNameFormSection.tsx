import { Controller, useFormContext } from 'react-hook-form';

import { FormSection } from '@shared/components/FormSection/FormSection';
import { RadioButtonForm } from '@shared/components/RadioButtonForm/RadioButtonForm';
import { TextForm } from '@shared/components/TextForm/TextForm';
import { Watcher } from '@shared/components/Watcher/Watcher';
import { YES_OR_NO_ITEMS } from '@shared/consts/yesOrNo';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';

const title = '通名届';
const idPrefix = 'nickName';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function NickNameFormSection({ className }: Props) {
  const { control } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <Controller
        name="nickname.required"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioButtonForm
            idPrefix={`${idPrefix}-required`}
            direction="row"
            items={YES_OR_NO_ITEMS}
            title="通名届提出"
            errorMessage={error?.message}
            {...field}
            selectedId={field.value}
            titlePrefix="required"
          />
        )}
      />
      <Watcher
        name="nickname.required"
        control={control}
        render={({ fieldValue: required }) => (
          <>
            {required === 'true' && (
              <>
                <Controller
                  name={'nickname.name'}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextForm
                      id={`${idPrefix}-name`}
                      type="text"
                      label="届出名称（漢字）"
                      errorMessage={error?.message}
                      {...field}
                      labelPrefix="required"
                    />
                  )}
                />
                <Controller
                  name={'nickname.kana'}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextForm
                      id={`${idPrefix}-kana`}
                      type="text"
                      label="届出名称（カナ）"
                      errorMessage={error?.message}
                      {...field}
                      labelPrefix="required"
                    />
                  )}
                />
              </>
            )}
          </>
        )}
      />
    </FormSection>
  );
}
