import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { TextForm as Component } from '@shared/components/TextForm/TextForm';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  type: 'text',
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

export const MEMO_PROPS = {
  type: 'text',
  label: 'メモ',
  id: 'text-input-memo',
  name: 'text-input-memo',
  value: 'メモ',
  errorMessage: '',
  onBlur: doNothing,
  onChange: doNothing,
} as const;
export const Memo: Story = {
  args: MEMO_PROPS,
};

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'form-base-error',
    errorMessage: '数値で入力してください',
    labelPrefix: 'required',
  },
};
