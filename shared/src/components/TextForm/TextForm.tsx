import { forwardRef, memo } from 'react';

import { FormAidText } from '@shared/components/FormAidText/FormAidText';
import type { FormBaseProps } from '@shared/components/FormBase/FormBase';
import { FormBase } from '@shared/components/FormBase/FormBase';
import { TextInput } from '@shared/components/TextInput/TextInput';

type Props = FormBaseProps & {
  name: string;
  type: 'email' | 'tel' | 'text' | 'url' | 'numberLike';
  value?: string;
  placeholder?: string;
  postfix?: string;
  disabled?: boolean;
  indent?: 1;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
};

const NoMemorizedTextForm = forwardRef<HTMLInputElement, Props>(function TextForm(
  {
    className,
    type,
    id,
    name,
    label,
    labelPrefix,
    onClickQuestion,
    value,
    placeholder,
    errorMessage,
    postfix,
    disabled,
    indent,
    onChange,
    onBlur,
  },
  ref,
) {
  return (
    <FormBase
      className={className}
      id={id}
      label={label}
      labelPrefix={labelPrefix}
      onClickQuestion={onClickQuestion}
      errorMessage={errorMessage}
      indent={indent}
    >
      <div className="flex items-center">
        <TextInput
          className={`min-w-150px shrink grow ${type === 'numberLike' ? 'text-right' : ''}`}
          ref={ref}
          type={type === 'numberLike' ? 'text' : type}
          inputMode={type === 'numberLike' ? 'decimal' : undefined}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={!!errorMessage}
          onChange={onChange}
          onBlur={onBlur}
        />
        {!!postfix && <FormAidText className="ml-1 shrink-0" text={postfix} />}
      </div>
    </FormBase>
  );
});

export const TextForm = memo(NoMemorizedTextForm);
