import { useFormContext } from 'react-hook-form';

import { DateForm } from '@shared/components/DateForm/DateForm';
import { FormSection } from '@shared/components/FormSection/FormSection';
import type { CorporationInput } from '@shared/schemas/corporation/corporation';
import { dateToDateString, getCurrentDate } from '@shared/utils/date';

const dateRange = {
  min: undefined,
  max: dateToDateString(getCurrentDate(), 'yyyy-MM-dd'),
};

const title = '解約日';
const idPrefix = 'cancellationDate';

type Props = {
  className?: string;
};

/**
 * !CAUTION!
 * react-hook-formのuseFormContextを利用しているので、必ずFormProvider内で利用すること！
 * @see https://react-hook-form.com/docs/useformcontext
 */
export function CancellationDateFormSection({ className }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CorporationInput>();
  return (
    <FormSection title={title} className={className}>
      <DateForm
        id={`${idPrefix}`}
        label="解約日"
        errorMessage={errors?.cancellationDate?.message}
        {...register('cancellationDate')}
        {...dateRange}
        labelPrefix="optional"
      />
    </FormSection>
  );
}
