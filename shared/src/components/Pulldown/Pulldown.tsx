import { forwardRef } from 'react';

import { ArrowDropDownIcon } from '@shared/components/icons/ArrowDropDownIcon';
import type { OrNestedReadonly } from '@shared/utils/utilityTypes';

type Props = {
  className?: string;
  id: string;
  name: string;
  items: OrNestedReadonly<
    {
      id: string;
      text: string;
    }[]
  >;
  selectedId?: string;
  isInvalid?: boolean;
  describedId?: string;
  /** aria-label */
  ariaLabel?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Pulldown = forwardRef<HTMLSelectElement, Props>(function Pulldown(
  { className, id, name, items, selectedId, isInvalid, describedId, ariaLabel, onChange, onBlur },
  ref,
) {
  return (
    <div className={`relative flex  ${className || ''}`}>
      <select
        ref={ref}
        id={id}
        name={name}
        className={`
          min-h-12
          w-full
          cursor-pointer
          truncate
          border border-solid
          p-3
          pr-11
          text-base
          text-gray-dark
          ${isInvalid ? 'border-attention-dark bg-attention-light' : 'border-gray-semiLight bg-white'}
          appearance-none`}
        value={selectedId}
        aria-describedby={describedId}
        aria-label={ariaLabel}
        onChange={onChange}
        onBlur={onBlur}
      >
        {items.map(({ id, text }) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
      <ArrowDropDownIcon
        className="
          pointer-events-none
          absolute right-0 top-0.5
          size-11"
      />
    </div>
  );
});
