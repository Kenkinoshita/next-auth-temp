import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import { DateForm as Component } from '@shared/components/DateForm/DateForm';
import { doNothing } from '@shared/utils/forLinter';

const DEFAULT_PROPS: React.ComponentProps<typeof Component> = {
  label: '借入日',
  labelPrefix: 'optional',
  id: 'date-form',
  name: 'date-form',
  value: '2023-07-26',
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

export const Error: Story = {
  args: {
    ...DEFAULT_PROPS,
    id: 'date-form-error',
    errorMessage: '正しい日付で入力してください',
    labelPrefix: 'required',
  },
};
