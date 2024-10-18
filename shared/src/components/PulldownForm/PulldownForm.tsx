import { forwardRef, memo } from 'react';

import { FormAidText } from '@shared/components/FormAidText/FormAidText';
import type { FormBaseProps } from '@shared/components/FormBase/FormBase';
import { FormBase } from '@shared/components/FormBase/FormBase';
import { Pulldown } from '@shared/components/Pulldown/Pulldown';
import type { OrNestedReadonly } from '@shared/utils/utilityTypes';

type Props = FormBaseProps & {
  name: string;
  items: OrNestedReadonly<
    {
      id: string;
      text: string;
    }[]
  >;
  selectedId?: string;
  postfix?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur: React.ChangeEventHandler<HTMLSelectElement>;
};

const NoMemorizedPulldownForm = forwardRef<HTMLSelectElement, Props>(function PulldownForm(
  { className, id, name, items, label, labelPrefix, errorMessage, postfix, indent, selectedId, onChange, onBlur },
  ref,
) {
  return (
    <FormBase
      className={className}
      id={id}
      label={label}
      labelPrefix={labelPrefix}
      indent={indent}
      errorMessage={errorMessage}
    >
      <div className="flex items-center">
        <Pulldown
          className="grow"
          ref={ref}
          id={id}
          name={name}
          items={items}
          isInvalid={!!errorMessage}
          onChange={onChange}
          onBlur={onBlur}
          selectedId={selectedId}
        />
        {!!postfix && <FormAidText className="ml-1" text={postfix} />}
      </div>
    </FormBase>
  );
});

export const PulldownForm = memo(NoMemorizedPulldownForm);
