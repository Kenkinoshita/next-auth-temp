import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';

import { TextAreaForm as Component } from '@shared/components/TextAreaForm/TextAreaForm';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  label: '借入金額',
  labelPrefix: 'optional',
  id: 'text-input',
  name: 'text-input',
  value: '999',
  errorMessage: '',
  onBlur: doNothing,
  onChange: doNothing,
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  component: Component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    ...DEFAULT_PROPS,
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Docs: Story = {
  args: {
    ...DEFAULT_PROPS,
  },
};

function InteractiveComponent(props: React.ComponentProps<typeof Component>) {
  const [value, setValue] = useState<string>('入力値');

  return <Component {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export const FREE_MEMO_PROPS: React.ComponentProps<typeof Component> = {
  label: 'フリーメモ入力欄',
  id: 'text-area-memo',
  name: 'text-area-memo',
  value: 'フリーメモ',
  errorMessage: '',
  onBlur: doNothing,
  onChange: doNothing,
} as const;
export const Memo: Story = {
  args: FREE_MEMO_PROPS,
  render: InteractiveComponent,
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'form-base-error',
    errorMessage: '数値で入力してください',
    labelPrefix: 'required',
  },
};
