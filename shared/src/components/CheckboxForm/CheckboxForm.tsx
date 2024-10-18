import { forwardRef, memo } from 'react';

import { Checkbox } from '@shared/components/Checkbox/Checkbox';
import type { FieldsetProps } from '@shared/components/Fieldset/Fieldset';
import { Fieldset } from '@shared/components/Fieldset/Fieldset';
import { FormError } from '@shared/components/FormError/FormError';
import { toArrayIfNonArray } from '@shared/utils/utilityFunction';
import type { OrNestedReadonly } from '@shared/utils/utilityTypes';

type Props = FieldsetProps & {
  className?: string;
  idPrefix: string;
  name: string;
  items: OrNestedReadonly<
    {
      id: string;
      text: string;
    }[]
  >;
  errorMessage: string | undefined;
  /**
   * NOTE: 再計算時にreact-hook-form側で単数になってしまうケースがあるから配列だけでなく文字列も許容する
   * @see https://dx-dev.jbk-ops.jp/rd/issues/17036
   *
   * CAUTION: react-hook-formでuncontrolled componentとして利用する場合、再計算時に任意の項目が選択されてしまう場合があるため、指定しないこと
   * @see https://dx-dev.jbk-ops.jp/rd/issues/17398
   */
  selectedIds?: string[] | string;
  direction?: 'row' | 'column';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
};

const NoMemorizedCheckboxForm = forwardRef<HTMLInputElement, Props>(function CheckboxForm(
  {
    className,
    idPrefix,
    name,
    title,
    titlePrefix,
    items,
    selectedIds,
    errorMessage,
    indent,
    direction,
    onChange,
    onBlur,
    onClickQuestion,
  },
  ref,
) {
  return (
    <Fieldset
      className={className}
      title={title}
      titlePrefix={titlePrefix}
      onClickQuestion={onClickQuestion}
      indent={indent}
    >
      <div className={`${indent === 1 ? 'ml-4' : ''} sm:ml-0 sm:mt-2 ${direction === 'row' ? 'flex flex-wrap' : ''}`}>
        {items.map((item) => (
          <Checkbox
            ref={ref}
            className="mb-3"
            key={item.id}
            id={`${idPrefix}_${item.id}`}
            value={item.id}
            name={name}
            checked={selectedIds ? toArrayIfNonArray(selectedIds).includes(item.id) : undefined}
            onChange={onChange}
            onBlur={onBlur}
            text={item.text}
          />
        ))}
      </div>
      {!!errorMessage && (
        <FormError className={`${indent === 1 ? 'ml-4' : ''} mt-1.5 sm:ml-0`} message={errorMessage} />
      )}
    </Fieldset>
  );
});

export const CheckboxForm = memo(NoMemorizedCheckboxForm);
