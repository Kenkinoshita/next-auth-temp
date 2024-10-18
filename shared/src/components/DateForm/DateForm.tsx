import { forwardRef, memo } from 'react';

import { DateInput } from '@shared/components/DateInput/DateInput';
import type { FormBaseProps } from '@shared/components/FormBase/FormBase';
import { FormBase } from '@shared/components/FormBase/FormBase';

type Props = FormBaseProps & {
  name: string;
  value?: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  indent?: 1 | 2;
  /** yyyy-MM-dd形式で指定 */
  max?: string;
  /** yyyy-MM-dd形式で指定 */
  min?: string;
};
const NoMemorizedDateForm = forwardRef<HTMLInputElement, Props>(function DateForm(
  { className, id, indent, name, label, labelPrefix, value, errorMessage, onChange, onBlur, max, min },
  ref,
) {
  return (
    <FormBase
      className={className}
      id={id}
      label={label}
      labelPrefix={labelPrefix}
      errorMessage={errorMessage}
      indent={indent}
    >
      <DateInput
        className="min-w-200px"
        ref={ref}
        id={id}
        name={name}
        value={value}
        isInvalid={!!errorMessage}
        onChange={onChange}
        onBlur={onBlur}
        max={max}
        min={min}
      />
    </FormBase>
  );
});

export const DateForm = memo(NoMemorizedDateForm);
