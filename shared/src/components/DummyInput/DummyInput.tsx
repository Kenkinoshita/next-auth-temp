import { memo } from 'react';

type Props = {
  text: string;
  className?: string;
};

/**
 * use ONLY with storybook stories
 */
export const DummyInput = memo(function DummyInput({ text, className }: Props) {
  return (
    <div
      className={`${
        className || ''
      } flex h-11 items-center rounded-sm border border-solid border-gray-semiDark px-0.5 text-lg`}
    >
      {text}
    </div>
  );
});
