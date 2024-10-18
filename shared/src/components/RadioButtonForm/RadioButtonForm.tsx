import { forwardRef, memo } from 'react';

import type { FieldsetProps } from '@shared/components/Fieldset/Fieldset';
import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormAidText } from '@shared/components/FormAidText/FormAidText';
import { FormError } from '@shared/components/FormError/FormError';
import { RadioButton } from '@shared/components/RadioButton/RadioButton';
import { ReadonlyForm } from '@shared/components/ReadonlyForm/ReadonlyForm';
import type { OrNestedReadonly } from '@shared/utils/utilityTypes';

type RadioButtonItem = {
  id: string;
  text: string;
};

type Props = FieldsetProps & {
  className?: string;
  idPrefix: string;
  name: string;
  items: OrNestedReadonly<RadioButtonItem[]>;
  errorMessage: string | undefined;
  selectedId?: string;
  direction?: 'row' | 'column';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
};

const NoMemorizedRadioButtonForm = forwardRef<HTMLInputElement, Props>(function RadioButtonForm(
  {
    className,
    idPrefix,
    name,
    title,
    titlePrefix,
    items,
    selectedId,
    errorMessage,
    indent,
    direction,
    onChange,
    onBlur,
    onClickQuestion,
    readOnly,
  },
  ref,
) {
  if (readOnly) {
    const selectedItem = items.find((item) => item.id === selectedId);
    return (
      <ReadonlyForm label={title}>
        <div className="mt-3 flex items-center justify-end sm:mt-0">
          <FormAidText text={selectedItem ? selectedItem.text : '-'} />
        </div>
      </ReadonlyForm>
    );
  }

  return (
    <Fieldset
      className={className}
      title={title}
      titlePrefix={titlePrefix}
      onClickQuestion={onClickQuestion}
      indent={indent}
    >
      <div
        className={`${indent === 1 ? 'ml-4' : ''} sm:ml-0 sm:mt-2 ${direction === 'row' ? 'flex flex-wrap gap-3' : ''}`}
      >
        {items.map((item) => (
          <RadioButton
            ref={ref}
            className="mb-3"
            key={item.id}
            id={`${idPrefix}_${item.id}`}
            name={name}
            value={item.id}
            // React-hook-formが機能しないので、未設定の場合はundefinedを設定する
            checked={selectedId ? selectedId === item.id : undefined}
            onChange={onChange}
            onBlur={onBlur}
          >
            {item.text}
          </RadioButton>
        ))}
      </div>
      {!!errorMessage && <FormError className="mt-1.5" message={errorMessage} />}
    </Fieldset>
  );
});

export const RadioButtonForm = memo(NoMemorizedRadioButtonForm);
