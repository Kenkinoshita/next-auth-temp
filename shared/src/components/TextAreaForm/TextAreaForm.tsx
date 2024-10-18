import { forwardRef } from 'react';

import { FormAidText } from '@shared/components/FormAidText/FormAidText';
import type { FormBaseProps } from '@shared/components/FormBase/FormBase';
import { FormBase } from '@shared/components/FormBase/FormBase';
import { TextArea } from '@shared/components/TextArea/TextArea';

type Props = FormBaseProps & {
  name: string;
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.ChangeEventHandler<HTMLTextAreaElement>;
  postfix?: string;
};

export const TextAreaForm = forwardRef<HTMLTextAreaElement, Props>(function TextAreaForm(
  {
    className,
    id,
    name,
    label,
    labelPrefix,
    onClickQuestion,
    value,
    placeholder,
    errorMessage,
    indent,
    postfix,
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
        <TextArea
          ref={ref}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          isInvalid={!!errorMessage}
          onChange={onChange}
          onBlur={onBlur}
        />
        {!!postfix && <FormAidText className="ml-1 shrink-0" text={postfix} />}
      </div>
    </FormBase>
  );
});
